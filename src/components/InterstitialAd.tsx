import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function InterstitialAd() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Always show the ad when component mounts (on refresh or navigation to home)
    // Small delay to make it feel natural
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    setOpen(false);
    navigate("/produk"); // Redirect to product page when clicked
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        {/* Dark overlay instead of white/background */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content container - center of screen */}
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[100] translate-x-[-50%] translate-y-[-50%] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          
          <DialogPrimitive.Title className="sr-only">Promo Spesial</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Dapatkan promo khusus hari ini.</DialogPrimitive.Description>
          
          <div className="relative">
            {/* Custom Close Button */}
            <DialogPrimitive.Close 
              className="absolute -top-2 -right-2 md:top-2 md:right-2 z-50 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 opacity-90 hover:opacity-100 transition-all"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            {/* Promo Image */}
            <div 
              onClick={handleImageClick}
              className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <img 
                src="/images/promo-durian.png" 
                alt="Promo Bibit Durian Raja" 
                className="w-[85vw] max-w-[320px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[700px] xl:max-w-[800px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
