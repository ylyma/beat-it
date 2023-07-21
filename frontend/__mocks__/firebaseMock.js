module.exports = {
    getApps: jest.fn(() => []),
    initializeApp: jest.fn(),
    getApp: jest.fn(),
    getFirestore: jest.fn(() => ({
      collection: jest.fn(),
    })),
    collection: jest.fn(() => ({
      withConverter: jest.fn(),
    })),
    isSupported: jest.fn().mockResolvedValue(true),
    getAnalytics: jest.fn().mockResolvedValue({
        logEvent: jest.fn(),
        setUserId: jest.fn(),
        setUserProperties: jest.fn(),
        setCurrentScreen: jest.fn(),
        setAnalyticsCollectionEnabled: jest.fn(),
        setSessionTimeoutDuration: jest.fn(),
        setDefaultEventParameters: jest.fn(),
        resetAnalyticsData: jest.fn(),
        app: {
            name: 'test',
            options: {
                projectId: 'test',
            },
        },
    }),
    GoogleAuthProvider: () => {
        return {
            credential: jest.fn(),
            configure: jest.fn(),
        }
    },
    getAuth: jest.fn()
  }