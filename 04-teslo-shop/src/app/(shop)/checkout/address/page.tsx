import { AdressForm } from "@/components/address/AdressForm";
import { Title } from "@/components/ui/Title";

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center px-1">
      <div className="w-full  max-w-[1400px] flex flex-col justify-center text-left">
        <Title title="Address" subTitle="Delivery address" />

        <AdressForm />
      </div>
    </div>
  );
}
