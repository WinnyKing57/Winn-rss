import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.winrss',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    maxLogcatObjectSize: 2048
  },
  cssParser: 'rework',
  discardUncaughtJsExceptions: false,
  performanceReport: false,
  profiling: 'timeline',
  webpackConfigPath: './webpack.config.js'
} as NativeScriptConfig;