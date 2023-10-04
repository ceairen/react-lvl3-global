import React, { useEffect } from "react";
import { AppStorage, AppStorageData, AppStorageDataParam } from "./types";

const StorageContext = React.createContext<any>({});

function loadDatas(): AppStorage {
  const localStorageItems = { ...window.localStorage };
  const appStorageItems: AppStorage = [];
  Object.entries(localStorageItems).map((entry) => {
    const [key, value] = entry;
    if (key.startsWith("StorageApp_")) {
      try {
        const parsedValue = JSON.parse(value);
        appStorageItems.push({
          key: key,
          value: parsedValue,
        });
      } catch (e) {
        appStorageItems.push({
          key: key,
          value: [value],
        });
      }
    }
  });
  return appStorageItems;
}

function getPrefixedKey(key: string): string {
  return `StorageApp_${key}`;
}

export const StorageProvider: React.FC<any> = ({ children }) => {
  const [storage, setStorage] = React.useState<AppStorage>(loadDatas());

  function setStorageItem(data: AppStorageDataParam) {
    const prefixedKey = getPrefixedKey(data.key);
    const existsKey = storage.find(
      (storageData) => storageData.key === prefixedKey
    );
    if (existsKey) {
      const newStorage = storage;
      newStorage
        .filter((storageData) => storageData.key === prefixedKey)[0]
        .value.push(data.value);
      setStorage((storage) => [...newStorage]);
    } else {
      setStorage((storage) => [
        ...storage,
        {
          key: prefixedKey,
          value: [data.value],
        },
      ]);
    }
  }

  function rmStorageItem(key: string) {
    const prefixedKey = getPrefixedKey(key);
    const newStorage = storage.reduce(
      (prev: AppStorage, cur: AppStorageData) => {
        if (cur.key !== prefixedKey) prev.push(cur);
        return prev;
      },
      []
    );
    setStorage([...newStorage]);
    localStorage.removeItem(prefixedKey);
  }

  useEffect(() => {
    storage.map((storageData) => {
      localStorage.setItem(storageData.key, JSON.stringify(storageData.value));
    });
  }, [storage]);

  useEffect(() => {
    function handleStorageChanged() {
      setStorage(loadDatas());
    }
    window.addEventListener("storage", handleStorageChanged);
    return () => {
      window.removeEventListener("storage", handleStorageChanged);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer = setInterval(function () {
      setStorage(loadDatas());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function getStorageItem(key: string): AppStorageData | null {
    const item = storage.find(
      (storageData) => storageData.key === getPrefixedKey(key)
    );
    if (item === undefined) return null;
    return item;
  }

  const value = {
    storage,
    rmStorageItem,
    getStorageItem,
    setStorageItem,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export function useStorage(): {
  storage: AppStorage;
  rmStorageItem: (key: string) => void;
  getStorageItem: (key: string) => AppStorageData | null;
  setStorageItem: (data: AppStorageDataParam) => void;
} {
  const { storage, rmStorageItem, getStorageItem, setStorageItem } =
    React.useContext(StorageContext);

  return {
    storage,
    rmStorageItem,
    getStorageItem,
    setStorageItem,
  };
}
