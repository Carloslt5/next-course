import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    name: string;
    lastName: string;
    address: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
  };
  setAddress: (address: State["address"]) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        name: "",
        lastName: "",
        address: "",
        address2: "",
        zipCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address });
      },
      clearAddress: () => {
        set({
          address: {
            name: "",
            lastName: "",
            address: "",
            address2: "",
            zipCode: "",
            city: "",
            country: "",
            phone: "",
          },
        });
      },
    }),
    { name: "address-store" }
  )
);
