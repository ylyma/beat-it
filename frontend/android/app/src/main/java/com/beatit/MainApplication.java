package com.beatit;

import android.content.res.Configuration;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.rnfs.RNFSPackage;
<<<<<<< HEAD

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
=======
import com.lugg.RNCConfig.RNCConfigPackage;
import com.brentvatne.react.ReactVideoPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(this, new DefaultReactNativeHost(this) {
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for
            // example:
            // packages.add(new MyReactNativePackage());
<<<<<<< HEAD
=======
            packages.add(new ReactVideoPackage());
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
            return BuildConfig.IS_HERMES_ENABLED;
        }
<<<<<<< HEAD
    };
=======
    });
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for
            // this app.
            DefaultNewArchitectureEntryPoint.load();
        }
        ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
<<<<<<< HEAD
=======
        ApplicationLifecycleDispatcher.onApplicationCreate(this);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
    }
}
