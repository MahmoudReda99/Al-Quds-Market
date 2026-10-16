import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  Loader2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { bulkUpsertProducts, ensureCategory } from '../api';
import type { CategoryWithChildren, CreateProductInput } from '../types';
import { useQueryClient } from '@tanstack/react-query';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryWithChildren[];
  isAr: boolean;
}

interface ParsedRowPreview {
  rawNameAr: string;
  nameEn: string;
  categoryName: string;
  matchedCategoryId: string | null;
  categorySlug: string;
  price: number;
  stock: number;
  sku: string;
  unitAr: string;
  unitEn: string;
  imageUrl?: string;
  isActive: boolean;
}

// Canonical category dictionary matching Al Quds Market & InstaShop 36 categories
const CATEGORY_MAP: Record<string, { slug: string; nameAr: string; nameEn: string }> = {
  // Arabic variations
  'عروض وتخفيضات': { slug: 'offers', nameAr: 'عروض وتخفيضات', nameEn: 'Offers' },
  'عروض': { slug: 'offers', nameAr: 'عروض وتخفيضات', nameEn: 'Offers' },
  'العودة للمدارس': { slug: 'back-to-school', nameAr: 'العودة للمدارس', nameEn: 'Back 2 School' },
  'ألبان وبيض': { slug: 'dairy-eggs', nameAr: 'ألبان وبيض', nameEn: 'Dairy & Eggs' },
  'البان وبيض': { slug: 'dairy-eggs', nameAr: 'ألبان وبيض', nameEn: 'Dairy & Eggs' },
  'خضار وفواكه طازجة': { slug: 'fruits-vegetables', nameAr: 'فواكه وخضروات', nameEn: 'Fruits & Vegetables' },
  'فواكه وخضروات': { slug: 'fruits-vegetables', nameAr: 'فواكه وخضروات', nameEn: 'Fruits & Vegetables' },
  'خضروات وفواكه': { slug: 'fruits-vegetables', nameAr: 'فواكه وخضروات', nameEn: 'Fruits & Vegetables' },
  'مخبوزات طازجة': { slug: 'bakery', nameAr: 'مخبوزات طازجة', nameEn: 'Bakery' },
  'مخبوزات': { slug: 'bakery', nameAr: 'مخبوزات طازجة', nameEn: 'Bakery' },
  'مكسرات وبذور': { slug: 'nuts-seeds', nameAr: 'مكسرات وبذور', nameEn: 'Nuts & Seeds' },
  'مكسرات': { slug: 'nuts-seeds', nameAr: 'مكسرات وبذور', nameEn: 'Nuts & Seeds' },
  'أدوات مكتبية ومدرسية': { slug: 'stationery', nameAr: 'أدوات مكتبية ومدرسية', nameEn: 'Stationery' },
  'أدوات مكتبية': { slug: 'stationery', nameAr: 'أدوات مكتبية ومدرسية', nameEn: 'Stationery' },
  'شيبسي ومقرمشات': { slug: 'chips-snacks', nameAr: 'شيبسي ومقرمشات', nameEn: 'Chips & Snacks' },
  'سناكس ومقرمشات': { slug: 'chips-snacks', nameAr: 'شيبسي ومقرمشات', nameEn: 'Chips & Snacks' },
  'وجبات سريعة وساندوتشات': { slug: 'grab-and-go', nameAr: 'وجبات سريعة وساندوتشات', nameEn: 'Grab & Go' },
  'شوكولاتة وحلويات': { slug: 'chocolates-candies', nameAr: 'شوكولاتة وحلويات', nameEn: 'Chocolates & Candies' },
  'حلويات وشوكولاتة': { slug: 'chocolates-candies', nameAr: 'شوكولاتة وحلويات', nameEn: 'Chocolates & Candies' },
  'مشروبات غازية وعصائر': { slug: 'soft-drinks-juices', nameAr: 'مشروبات غازية وعصائر', nameEn: 'Soft Drinks & Juices' },
  'عصائر ومشروبات': { slug: 'soft-drinks-juices', nameAr: 'مشروبات غازية وعصائر', nameEn: 'Soft Drinks & Juices' },
  'مياه معدنية': { slug: 'water', nameAr: 'مياه معدنية', nameEn: 'Water' },
  'مياه': { slug: 'water', nameAr: 'مياه معدنية', nameEn: 'Water' },
  'شاي وقهوة': { slug: 'coffee-tea', nameAr: 'قهوة وشاي', nameEn: 'Coffee & Tea' },
  'قهوة وشاي': { slug: 'coffee-tea', nameAr: 'قهوة وشاي', nameEn: 'Coffee & Tea' },
  'آيس كريم ومثلجات': { slug: 'ice-creams', nameAr: 'آيس كريم ومثلجات', nameEn: 'Ice Creams' },
  'ايس كريم ومثلجات': { slug: 'ice-creams', nameAr: 'آيس كريم ومثلجات', nameEn: 'Ice Creams' },
  'منظفات وعناية منزلية': { slug: 'household-care', nameAr: 'منظفات وعناية منزلية', nameEn: 'Household Care' },
  'منظفات': { slug: 'household-care', nameAr: 'منظفات وعناية منزلية', nameEn: 'Household Care' },
  'نظافة وعناية شخصية': { slug: 'hygiene-personal-care', nameAr: 'نظافة وعناية شخصية', nameEn: 'Hygiene & Personal Care' },
  'عناية بالجسم': { slug: 'body-care', nameAr: 'عناية بالجسم', nameEn: 'Body Care' },
  'عناية بالبشرة والوجه': { slug: 'facial-care', nameAr: 'عناية بالبشرة والوجه', nameEn: 'Facial Care' },
  'شامبو وعناية بالشعر': { slug: 'shampoos-hair-care', nameAr: 'شامبو وعناية بالشعر', nameEn: 'Shampoos & Hair Care' },
  'عناية بالأطفال': { slug: 'baby-care', nameAr: 'عناية بالأطفال', nameEn: 'Baby Care' },
  'مستلزمات الخبز والحلويات': { slug: 'home-baking', nameAr: 'مستلزمات الخبز والحلويات', nameEn: 'Home Baking' },
  'حبوب إفطار وشوفان': { slug: 'cereals-packets', nameAr: 'حبوب إفطار وشوفان', nameEn: 'Cereals & Packets' },
  'لحوم ودواجن وأسماك': { slug: 'meat-fish', nameAr: 'لحوم ودواجن وأسماك', nameEn: 'Meat & Fish' },
  'لحوم ودواجن': { slug: 'meat-fish', nameAr: 'لحوم ودواجن وأسماك', nameEn: 'Meat & Fish' },
  'معلبات وبرطمانات': { slug: 'cans-jars', nameAr: 'معلبات وبرطمانات', nameEn: 'Cans & Jars' },
  'معلبات': { slug: 'cans-jars', nameAr: 'معلبات وبرطمانات', nameEn: 'Cans & Jars' },
  'مكرونة وأرز وحبوب': { slug: 'pasta-rice', nameAr: 'مكرونة وأرز وحبوب', nameEn: 'Pasta, Rice & More' },
  'مكرونة وارز وحبوب': { slug: 'pasta-rice', nameAr: 'مكرونة وأرز وحبوب', nameEn: 'Pasta, Rice & More' },
  'منتجات عالمية ومستوردة': { slug: 'around-the-world', nameAr: 'منتجات عالمية ومستوردة', nameEn: 'Around the World' },
  'منتجات صحية وعضوية': { slug: 'healthy-organic', nameAr: 'منتجات صحية وعضوية', nameEn: 'Healthy & Organic' },
  'أعشاب وتوابل': { slug: 'herbs-spices', nameAr: 'أعشاب وتوابل', nameEn: 'Herbs & Spices' },
  'توابل وبهارات': { slug: 'herbs-spices', nameAr: 'أعشاب وتوابل', nameEn: 'Herbs & Spices' },
  'مجمدات': { slug: 'frozen', nameAr: 'مجمدات', nameEn: 'Frozen' },
  'مستحضرات تجميل ومكياج': { slug: 'cosmetics', nameAr: 'مستحضرات تجميل ومكياج', nameEn: 'Cosmetics' },
  'صحة عامة وفيتامينات': { slug: 'general-health', nameAr: 'صحة عامة وفيتامينات', nameEn: 'General Health' },
  'أخرى ومستلزمات احتفالات': { slug: 'more', nameAr: 'أخرى ومستلزمات احتفالات', nameEn: 'More' },
  'أخرى': { slug: 'more', nameAr: 'أخرى ومستلزمات احتفالات', nameEn: 'More' },
  'إلكترونيات واكسسوارات': { slug: 'electronics', nameAr: 'إلكترونيات واكسسوارات', nameEn: 'Electronics' },
  'أدوات المطبخ والمنزل': { slug: 'kitchen-pantry', nameAr: 'أدوات المطبخ والمنزل', nameEn: 'Kitchen & Pantry' },
  'مستلزمات الرحلات والشواء': { slug: 'camping-bbq', nameAr: 'مستلزمات الرحلات والشواء', nameEn: 'Camping & BBQ Essentials' },

  // English variations
  'offers': { slug: 'offers', nameAr: 'عروض وتخفيضات', nameEn: 'Offers' },
  'back 2 school': { slug: 'back-to-school', nameAr: 'العودة للمدارس', nameEn: 'Back 2 School' },
  'back to school': { slug: 'back-to-school', nameAr: 'العودة للمدارس', nameEn: 'Back 2 School' },
  'dairy & eggs': { slug: 'dairy-eggs', nameAr: 'ألبان وبيض', nameEn: 'Dairy & Eggs' },
  'fruits & vegetables': { slug: 'fruits-vegetables', nameAr: 'فواكه وخضروات', nameEn: 'Fruits & Vegetables' },
  'bakery': { slug: 'bakery', nameAr: 'مخبوزات طازجة', nameEn: 'Bakery' },
  'nuts & seeds': { slug: 'nuts-seeds', nameAr: 'مكسرات وبذور', nameEn: 'Nuts & Seeds' },
  'stationery': { slug: 'stationery', nameAr: 'أدوات مكتبية ومدرسية', nameEn: 'Stationery' },
  'chips & snacks': { slug: 'chips-snacks', nameAr: 'شيبسي ومقرمشات', nameEn: 'Chips & Snacks' },
  'grab & go': { slug: 'grab-and-go', nameAr: 'وجبات سريعة وساندوتشات', nameEn: 'Grab & Go' },
  'chocolates & candies': { slug: 'chocolates-candies', nameAr: 'شوكولاتة وحلويات', nameEn: 'Chocolates & Candies' },
  'soft drinks & juices': { slug: 'soft-drinks-juices', nameAr: 'مشروبات غازية وعصائر', nameEn: 'Soft Drinks & Juices' },
  'water': { slug: 'water', nameAr: 'مياه معدنية', nameEn: 'Water' },
  'coffee & tea': { slug: 'coffee-tea', nameAr: 'قهوة وشاي', nameEn: 'Coffee & Tea' },
  'ice creams': { slug: 'ice-creams', nameAr: 'آيس كريم ومثلجات', nameEn: 'Ice Creams' },
  'household care': { slug: 'household-care', nameAr: 'منظفات وعناية منزلية', nameEn: 'Household Care' },
  'hygiene & personal care': { slug: 'hygiene-personal-care', nameAr: 'نظافة وعناية شخصية', nameEn: 'Hygiene & Personal Care' },
  'body care': { slug: 'body-care', nameAr: 'عناية بالجسم', nameEn: 'Body Care' },
  'facial care': { slug: 'facial-care', nameAr: 'عناية بالبشرة والوجه', nameEn: 'Facial Care' },
  'shampoos & hair care': { slug: 'shampoos-hair-care', nameAr: 'شامبو وعناية بالشعر', nameEn: 'Shampoos & Hair Care' },
  'baby care': { slug: 'baby-care', nameAr: 'عناية بالأطفال', nameEn: 'Baby Care' },
  'home baking': { slug: 'home-baking', nameAr: 'مستلزمات الخبز والحلويات', nameEn: 'Home Baking' },
  'cereals & packets': { slug: 'cereals-packets', nameAr: 'حبوب إفطار وشوفان', nameEn: 'Cereals & Packets' },
  'meat & fish': { slug: 'meat-fish', nameAr: 'لحوم ودواجن وأسماك', nameEn: 'Meat & Fish' },
  'cans & jars': { slug: 'cans-jars', nameAr: 'معلبات وبرطمانات', nameEn: 'Cans & Jars' },
  'pasta, rice & more': { slug: 'pasta-rice', nameAr: 'مكرونة وأرز وحبوب', nameEn: 'Pasta, Rice & More' },
  'pasta-rice': { slug: 'pasta-rice', nameAr: 'مكرونة وأرز وحبوب', nameEn: 'Pasta, Rice & More' },
  'around the world': { slug: 'around-the-world', nameAr: 'منتجات عالمية ومستوردة', nameEn: 'Around the World' },
  'healthy & organic': { slug: 'healthy-organic', nameAr: 'منتجات صحية وعضوية', nameEn: 'Healthy & Organic' },
  'herbs & spices': { slug: 'herbs-spices', nameAr: 'أعشاب وتوابل', nameEn: 'Herbs & Spices' },
  'frozen': { slug: 'frozen', nameAr: 'مجمدات', nameEn: 'Frozen' },
  'cosmetics': { slug: 'cosmetics', nameAr: 'مستحضرات تجميل ومكياج', nameEn: 'Cosmetics' },
  'general health': { slug: 'general-health', nameAr: 'صحة عامة وفيتامينات', nameEn: 'General Health' },
  'more': { slug: 'more', nameAr: 'أخرى ومستلزمات احتفالات', nameEn: 'More' },
  'electronics': { slug: 'electronics', nameAr: 'إلكترونيات واكسسوارات', nameEn: 'Electronics' },
  'kitchen & pantry': { slug: 'kitchen-pantry', nameAr: 'أدوات المطبخ والمنزل', nameEn: 'Kitchen & Pantry' },
  'camping & bbq essentials': { slug: 'camping-bbq', nameAr: 'مستلزمات الرحلات والشواء', nameEn: 'Camping & BBQ Essentials' },
};

function autoDetectUnit(name: string): { ar: string; en: string } {
  const mLiter = name.match(/(\d+(?:\.\d+)?)\s*(?:لتر|ل|ليتر)/i);
  if (mLiter) return { ar: `${mLiter[1]} لتر`, en: `${mLiter[1]}L` };
  if (/لتر ونص/i.test(name)) return { ar: '1.5 لتر', en: '1.5L' };
  if (/لتر/i.test(name)) return { ar: '1 لتر', en: '1L' };

  const mMl = name.match(/(\d+)\s*(?:مل|ملل|مللى|ملم)/i);
  if (mMl) return { ar: `${mMl[1]} مل`, en: `${mMl[1]}ml` };

  const mKg = name.match(/(\d+(?:\.\d+)?)\s*(?:كجم|كيلو|كيلوجرام|ك)/i);
  if (mKg && !/2\/1\s*ك|1\/2\s*ك|1\/4\s*ك/i.test(name)) return { ar: `${mKg[1]} كجم`, en: `${mKg[1]}kg` };
  if (/2\/1\s*ك|1\/2\s*ك|نصف كيلو|نص كيلو/i.test(name)) return { ar: '500 جم', en: '500g' };
  if (/1\/4\s*ك|ربع كيلو/i.test(name)) return { ar: '250 جم', en: '250g' };
  if (/بالكيلو/i.test(name)) return { ar: '1 كجم', en: '1kg' };

  const mG = name.match(/(\d+)\s*(?:جم|جرام|غ)/i);
  if (mG) return { ar: `${mG[1]} جم`, en: `${mG[1]}g` };

  const mPcs = name.match(/(\d+)\s*(?:قطعة|قطع|فتلة|فتله|بكرة|رغيف)/i);
  if (mPcs) return { ar: `${mPcs[1]} قطع`, en: `${mPcs[1]} pcs` };

  return { ar: 'قطعة', en: 'piece' };
}

export default function ExcelImportModal({
  isOpen,
  onClose,
  categories,
  isAr,
}: ExcelImportModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<ParsedRowPreview[]>([]);
  const [allParsedRows, setAllParsedRows] = useState<ParsedRowPreview[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  if (!isOpen) return null;

  // Resolve category by Arabic name, English name, or slug
  const resolveCategory = (rawAr: string, rawEn?: string): { id: string | null; slug: string; nameAr: string; nameEn: string } => {
    const cleanAr = (rawAr || '').trim().toLowerCase();
    const cleanEn = (rawEn || '').trim().toLowerCase();

    // 1. Direct match with current DB categories
    const dbMatch = categories.find((c) => {
      const cAr = (c.name_ar || '').trim().toLowerCase();
      const cEn = (c.name_en || '').trim().toLowerCase();
      const cSlug = (c.slug || '').trim().toLowerCase();
      return (
        cAr === cleanAr ||
        cEn === cleanEn ||
        cSlug === cleanEn ||
        cSlug === cleanAr
      );
    });

    if (dbMatch) {
      return { id: dbMatch.id, slug: dbMatch.slug, nameAr: dbMatch.name_ar, nameEn: dbMatch.name_en };
    }

    // 2. Check canonical dictionary
    const dictMatch = CATEGORY_MAP[cleanAr] || (cleanEn ? CATEGORY_MAP[cleanEn] : null);
    if (dictMatch) {
      const existingInDb = categories.find((c) => c.slug === dictMatch.slug);
      return {
        id: existingInDb ? existingInDb.id : null,
        slug: dictMatch.slug,
        nameAr: dictMatch.nameAr,
        nameEn: dictMatch.nameEn,
      };
    }

    // 3. Fallback: return raw names
    const fallbackSlug = (rawEn || rawAr).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'other';
    return { id: null, slug: fallbackSlug, nameAr: rawAr || 'أخرى', nameEn: rawEn || 'Other' };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsParsing(true);
    setParseError(null);
    setImportResult(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rawJson = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        defval: '',
      });

      if (!rawJson || rawJson.length === 0) {
        throw new Error(isAr ? 'الملف فارغ أو لا يحتوي على صفوف صالحة.' : 'File is empty or contains no valid rows.');
      }

      // Map rows
      const parsed: ParsedRowPreview[] = [];
      rawJson.forEach((row, idx) => {
        // Try multiple header aliases
        const nameAr = String(
          row['Product Name (Arabic)'] ||
          row['Product Name'] ||
          row['اسم المنتج'] ||
          row['الصنف'] ||
          row['name_ar'] ||
          ''
        ).trim();

        if (!nameAr || nameAr.includes('تقرير الارصده') || nameAr.includes('الاجمالى')) {
          return;
        }

        const catAr = String(
          row['Category (Arabic)'] ||
          row['القسم'] ||
          row['الفئة'] ||
          row['category_ar'] ||
          ''
        ).trim();

        const catEn = String(
          row['Category (English)'] ||
          row['Category'] ||
          row['category_en'] ||
          ''
        ).trim();

        const brand = String(row['Brand'] || row['الماركة'] || '').trim();

        const rawPrice =
          row['Unit Cost/Price'] ||
          row['Price'] ||
          row['السعر'] ||
          row['سعر'] ||
          row['price'] ||
          0;
        const price = Math.max(0, parseFloat(String(rawPrice)) || 0);

        const rawQty =
          row['Quantity/الكمية'] ||
          row['الكمية'] ||
          row['Quantity'] ||
          row['كميه'] ||
          row['stock_quantity'] ||
          0;
        const stock = Math.max(0, parseFloat(String(rawQty)) || 0);

        const rawSku = String(
          row['SKU / Barcode'] ||
          row['SKU'] ||
          row['Barcode'] ||
          row['الباركود'] ||
          row['كود'] ||
          row['sku'] ||
          ''
        ).trim();

        const resolvedCat = resolveCategory(catAr, catEn);
        const sku = rawSku || `ALQ-${resolvedCat.slug.slice(0, 3).toUpperCase()}-${String(idx + 1).padStart(4, '0')}`;

        const imageUrl = String(row['Image URL'] || row['Image'] || row['صورة'] || '').trim() || undefined;

        const rawActive = String(row['Active'] || row['نشط'] || 'Yes').trim().toLowerCase();
        const isActive = rawActive === 'yes' || rawActive === '1' || rawActive === 'true' || rawActive === 'نعم';

        const units = autoDetectUnit(nameAr);

        parsed.push({
          rawNameAr: nameAr,
          nameEn: brand ? `${brand} ${nameAr}` : nameAr,
          categoryName: catAr || catEn || resolvedCat.nameAr,
          matchedCategoryId: resolvedCat.id,
          categorySlug: resolvedCat.slug,
          price,
          stock,
          sku,
          unitAr: units.ar,
          unitEn: units.en,
          imageUrl,
          isActive,
        });
      });

      if (parsed.length === 0) {
        throw new Error(isAr ? 'لم يتم العثور على منتجات صالحة في الملف.' : 'No valid product rows found in file.');
      }

      setAllParsedRows(parsed);
      setPreviewRows(parsed.slice(0, 8));
    } catch (err: unknown) {
      setParseError(err instanceof Error ? err.message : 'Failed to parse file');
      setAllParsedRows([]);
      setPreviewRows([]);
    } finally {
      setIsParsing(false);
    }
  };

  const handleStartImport = async () => {
    if (allParsedRows.length === 0) return;

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      // 1. Ensure all categories exist in database
      const categoryIdMap: Record<string, string> = {};
      categories.forEach((c) => {
        categoryIdMap[c.slug] = c.id;
      });

      // Find missing categories and create them
      const missingSlugs = Array.from(new Set(allParsedRows.map((r) => r.categorySlug))).filter(
        (slug) => !categoryIdMap[slug]
      );

      for (const slug of missingSlugs) {
        const info = Object.values(CATEGORY_MAP).find((c) => c.slug === slug);
        const nameAr = info ? info.nameAr : slug;
        const nameEn = info ? info.nameEn : slug;
        const newId = await ensureCategory(nameAr, nameEn, slug);
        categoryIdMap[slug] = newId;
      }

      // 2. Prepare product payloads
      const payloads: CreateProductInput[] = allParsedRows.map((row) => ({
        sku: row.sku,
        name_ar: row.rawNameAr,
        name_en: row.nameEn,
        category_id: categoryIdMap[row.categorySlug] || categories[0]?.id || '',
        price: row.price,
        unit_label_ar: row.unitAr,
        unit_label_en: row.unitEn,
        stock_quantity: Math.round(row.stock),
        is_active: row.isActive,
        is_featured: false,
        images: row.imageUrl ? [{ url: row.imageUrl, alt_ar: row.rawNameAr, alt_en: row.nameEn }] : [],
      }));

      // 3. Execute bulk upsert in batches
      const { successCount, errors } = await bulkUpsertProducts(payloads, (processed, total) => {
        setImportProgress(Math.round((processed / total) * 100));
      });

      // Refresh queries
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      setImportResult({
        success: successCount,
        errors,
      });
    } catch (err: unknown) {
      setImportResult({
        success: 0,
        errors: [err instanceof Error ? err.message : 'Import failed'],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateRows = [
      {
        'Product Name (Arabic)': 'حليب جهينة كامل الدسم 1 لتر',
        'Category (Arabic)': 'ألبان وبيض',
        'Category (English)': 'Dairy & Eggs',
        'Brand': 'جهينة',
        'Quantity/الكمية': 50,
        'Unit Cost/Price': 45.00,
        'Total Value / الإجمالي': 2250.00,
        'SKU / Barcode': '6221155001010',
        'Image URL': 'https://example.com/juhayna-1l.jpg',
        'Active': 'Yes',
        'Notes': 'منتج أصلي',
      },
      {
        'Product Name (Arabic)': 'بيبسي كانز 330 مل',
        'Category (Arabic)': 'مشروبات غازية وعصائر',
        'Category (English)': 'Soft Drinks & Juices',
        'Brand': 'بيبسي',
        'Quantity/الكمية': 120,
        'Unit Cost/Price': 15.00,
        'Total Value / الإجمالي': 1800.00,
        'SKU / Barcode': '6221155002020',
        'Image URL': '',
        'Active': 'Yes',
        'Notes': '',
      },
      {
        'Product Name (Arabic)': 'شاي العروسة 40 جرام',
        'Category (Arabic)': 'شاي وقهوة',
        'Category (English)': 'Coffee & Tea',
        'Brand': 'العروسة',
        'Quantity/الكمية': 80,
        'Unit Cost/Price': 10.00,
        'Total Value / الإجمالي': 800.00,
        'SKU / Barcode': '6221155003030',
        'Image URL': '',
        'Active': 'Yes',
        'Notes': '',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products Template');
    XLSX.writeFile(wb, 'alquds_products_import_template.xlsx');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-surface-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-6 py-4 bg-surface-subtle/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {isAr ? 'استيراد المنتجات من إكسيل أو CSV' : 'Import Products from Excel / CSV'}
              </h2>
              <p className="text-xs text-foreground-muted">
                {isAr
                  ? 'رفع ملف الإكسيل لربط وتحديث الأصناف والأقسام والمخزون في المتجر تلقائياً'
                  : 'Upload an Excel or CSV sheet to automatically sync catalog, categories, and inventory'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isImporting}
            className="rounded-xl p-2 text-foreground-subtle hover:bg-surface-subtle transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Action Row: Download Template & Instructions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-brand-50/40 border border-brand-100">
            <div className="flex items-center gap-2.5">
              <Sparkles className="text-brand-700 shrink-0" size={18} />
              <div className="text-xs text-brand-900 leading-relaxed">
                {isAr
                  ? 'يتعرف النظام تلقائياً على الأعمدة: اسم المنتج، القسم (عربي/إنجليزي)، الكمية، السعر، والباركود.'
                  : 'Automatically recognizes: Product Name, Category (Arabic/English), Quantity, Price, and Barcode.'}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              className="text-xs shrink-0 flex items-center gap-1.5 bg-white border-brand-200 text-brand-800 hover:bg-brand-50"
            >
              <Download size={14} />
              <span>{isAr ? 'تحميل نموذج Excel جاهز' : 'Download Template'}</span>
            </Button>
          </div>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-surface-border hover:border-brand-500 rounded-3xl p-8 text-center transition-all hover:bg-brand-50/20 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-foreground-muted group-hover:bg-brand-100 group-hover:text-brand-800 transition-colors mb-3">
              <Upload size={24} />
            </div>
            <div className="text-sm font-bold text-foreground mb-1">
              {file
                ? file.name
                : isAr
                ? 'انقر هنا لاختيار ملف إكسيل (.xlsx, .xls) أو CSV'
                : 'Click to select an Excel (.xlsx, .xls) or CSV file'}
            </div>
            <p className="text-xs text-foreground-muted">
              {file
                ? `${(file.size / 1024).toFixed(1)} KB`
                : isAr
                ? 'يدعم جداول الإكسيل وملفات شيتات الجرد العربية والإنجليزية'
                : 'Supports Excel workbooks and Arabic inventory export files'}
            </p>
          </div>

          {/* Error Message */}
          {parseError && (
            <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Parsing State */}
          {isParsing && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-brand-700">
              <Loader2 className="animate-spin" size={18} />
              <span>{isAr ? 'جاري قراءة ومعالجة الملف...' : 'Parsing file rows...'}</span>
            </div>
          )}

          {/* Preview Section */}
          {allParsedRows.length > 0 && !isParsing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Layers size={15} className="text-brand-700" />
                  <span>
                    {isAr
                      ? `تم العثور على ${allParsedRows.length} منتج صالح للاستيراد`
                      : `Found ${allParsedRows.length} valid products ready for import`}
                  </span>
                </span>
                <span className="text-foreground-muted">
                  {isAr ? `عرض أول ${previewRows.length} أصناف كعينة` : `Previewing first ${previewRows.length} items`}
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-surface-border">
                <table className="w-full text-start text-xs">
                  <thead className="bg-surface-subtle text-foreground-muted font-bold border-b border-surface-border">
                    <tr>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'اسم الصنف' : 'Product Name'}</th>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'القسم المصنف' : 'Category'}</th>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'السعر' : 'Price'}</th>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'الكمية' : 'Qty'}</th>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'الوحدة' : 'Unit'}</th>
                      <th className="py-2.5 px-3 text-start">{isAr ? 'كود SKU' : 'SKU'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border bg-white">
                    {previewRows.map((row, i) => (
                      <tr key={i} className="hover:bg-surface-subtle/50">
                        <td className="py-2.5 px-3 font-semibold text-foreground">{row.rawNameAr}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-brand-50 text-brand-800 font-medium">
                            {row.categoryName}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-foreground">{row.price.toFixed(2)} ج.م</td>
                        <td className="py-2.5 px-3 font-semibold text-foreground">{row.stock}</td>
                        <td className="py-2.5 px-3 text-foreground-muted">{row.unitAr}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-foreground-muted">{row.sku}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Import Progress Bar */}
          {isImporting && (
            <div className="space-y-2 p-4 rounded-2xl bg-surface-subtle border border-surface-border">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin text-brand-700" size={14} />
                  <span>{isAr ? 'جاري رفع وحفظ المنتجات في قاعدة البيانات...' : 'Uploading products to database...'}</span>
                </span>
                <span>{importProgress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-border overflow-hidden">
                <div
                  className="h-full bg-brand-600 transition-all duration-300 rounded-full"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Summary */}
          {importResult && (
            <div
              className={`p-4 rounded-2xl border ${
                importResult.errors.length === 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              } text-xs space-y-1.5`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>
                  {isAr
                    ? `تم استيراد ${importResult.success} منتج بنجاح إلى قاعدة البيانات!`
                    : `Successfully imported ${importResult.success} products!`}
                </span>
              </div>
              {importResult.errors.length > 0 && (
                <div className="text-[11px] text-red-600 mt-1">
                  {importResult.errors.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-surface-border px-6 py-4 bg-surface-subtle/50">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isImporting}
            className="text-xs"
          >
            {importResult ? (isAr ? 'إغلاق' : 'Close') : (isAr ? 'إلغاء' : 'Cancel')}
          </Button>

          {!importResult && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleStartImport}
              disabled={isImporting || allParsedRows.length === 0}
              className="bg-brand-700 hover:bg-brand-800 text-white text-xs flex items-center gap-1.5"
            >
              {isImporting ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>{isAr ? 'جاري الاستيراد...' : 'Importing...'}</span>
                </>
              ) : (
                <>
                  <Upload size={14} />
                  <span>
                    {isAr
                      ? `بدء استيراد ${allParsedRows.length} منتج`
                      : `Start Import (${allParsedRows.length} items)`}
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
