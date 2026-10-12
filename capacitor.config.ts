/**
 * Capacitor Configuration for Al Quds Market (القدس ماركت)
 * Pre-configured for Android & iOS packaging.
 */

export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  server?: {
    androidScheme?: string;
    url?: string;
    cleartext?: boolean;
  };
  plugins?: Record<string, unknown>;
}

const config: CapacitorConfig = {
  appId: 'com.alqudsmarket.app',
  appName: 'Al Quds Market',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#15803d',
      showSpinner: false,
    },
  },
};

export default config;
