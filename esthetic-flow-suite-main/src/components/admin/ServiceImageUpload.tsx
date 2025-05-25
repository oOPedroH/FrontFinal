
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

const ServiceImageUpload = ({ currentImage, onImageChange, className }: ServiceImageUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Upload image functionality (mock for now, would be replaced with Supabase Storage upload)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      onImageChange(fileUrl);

      // In production with Supabase:
      // 1. Upload to Supabase Storage
      // 2. Get public URL
      // 3. Call onImageChange with the public URL
    }
  };

  const handleRemoveImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    onImageChange("");
  };

  const displayedImage = previewImage || currentImage;

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Imagem do Serviço</Label>
      <div
        className="border border-dashed border-input rounded-md overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {displayedImage ? (
          <div className="relative">
            <img 
              src={displayedImage} 
              alt="Prévia" 
              className="h-[200px] w-full object-cover"
            />
            <div 
              className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center transition-opacity ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                type="button"
                variant="secondary"
                className="mb-2"
                onClick={() => document.getElementById("service-image-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Trocar Imagem
              </Button>
              {displayedImage && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <Image className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-4">
              Clique para fazer upload
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("service-image-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Imagem
            </Button>
          </div>
        )}
      </div>
      <input
        id="service-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <p className="text-xs text-muted-foreground">
        Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.
      </p>
    </div>
  );
};

export default ServiceImageUpload;
