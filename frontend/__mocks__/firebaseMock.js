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
    analytics: jest.fn(() => ({
        isSupported: jest.fn(() => Promise),
    })),
    isSupported: jest.fn(() => Promise),
  }