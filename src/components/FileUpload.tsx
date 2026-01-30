import { useCallback, useState } from "react";
import { Upload, FileText, Image, X, Loader2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing?: boolean;
  acceptedTypes?: string;
}

export function FileUpload({ 
  onFileSelect, 
  isAnalyzing = false,
  acceptedTypes = ".pdf,.png,.jpg,.jpeg,.webp,.txt"
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-8 w-8 text-primary" />;
    }
    return <FileText className="h-8 w-8 text-primary" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 md:h-72 rounded-2xl cursor-pointer transition-all duration-300",
            "border-2 border-dashed backdrop-blur-xl",
            isDragging 
              ? "border-primary bg-primary/10 glow-primary" 
              : "border-white/20 bg-white/5 hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <input
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={handleFileInput}
          />
          
          {/* Animated rings */}
          <div className={cn(
            "absolute inset-0 rounded-2xl transition-opacity duration-500",
            isDragging ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-4 rounded-xl border border-primary/30 animate-pulse" />
            <div className="absolute inset-8 rounded-lg border border-primary/20 animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>
          
          <div className="relative flex flex-col items-center justify-center pt-5 pb-6">
            <div className={cn(
              "relative p-5 rounded-2xl mb-5 transition-all duration-300",
              isDragging ? "bg-primary/20 glow-primary scale-110" : "bg-white/10"
            )}>
              <Upload className={cn(
                "h-10 w-10 md:h-12 md:w-12 transition-all duration-300",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
              {isDragging && (
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
              )}
            </div>
            
            <p className="mb-2 text-lg md:text-xl font-semibold text-foreground">
              {isDragging ? "Release to Upload" : "Upload Medical Report"}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop or <span className="text-primary font-medium hover:underline">browse files</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {["PDF", "PNG", "JPG", "TXT"].map((type) => (
                <span 
                  key={type}
                  className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </label>
      ) : (
        <div className="w-full p-6 card-space animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 glow-primary">
              {getFileIcon(selectedFile)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {selectedFile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            
            {isAnalyzing ? (
              <div className="flex items-center gap-3 text-primary">
                <div className="relative">
                  <Rocket className="h-5 w-5 animate-float" />
                  <div className="absolute inset-0 animate-ping opacity-30">
                    <Rocket className="h-5 w-5" />
                  </div>
                </div>
                <span className="text-sm font-medium">Analyzing...</span>
              </div>
            ) : (
              <button
                onClick={clearFile}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
          
          {isAnalyzing && (
            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] rounded-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}