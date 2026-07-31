import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface InventoryItem {
  id: string;
  title: string;
  description: string;
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  hasItem: (id: string) => boolean;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export function InventoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<InventoryItem[]>([]);

  function hasItem(id: string) {
    return items.some((item) => item.id === id);
  }

  function addItem(item: InventoryItem) {
    if (hasItem(item.id)) return;

    setItems((prev) => [...prev, item]);
  }

  return (
    <InventoryContext.Provider
      value={{
        items,
        addItem,
        hasItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventory must be used inside InventoryProvider"
    );
  }

  return context;
}