import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shirt as TShirtIcon, UploadCloud } from 'lucide-react';
import Button from './components/common/Button';
import { products, fitRoomModels } from './data/mockProducts';

type TabOption = 'models' | 'upload';

const FitRoomPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<typeof fitRoomModels[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabOption>('models');

  const clothingProducts = products.filter((p) =>
    ['tees', 'hoodies', 'outerwear'].includes(p.category)
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string);
      setSelectedModel(null);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    if ((selectedModel || uploadedImage) && selectedProduct) {
      setShowPreview(true);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-neutral-950 text-white py-16 text-center">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Virtual FitRoom</h1>
          <p className="text-neutral-400 text-lg">
            Try on clothes virtually using a similar model or your own photo before buying.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Tabs */}
          <div className="flex border-b border-neutral-200 mb-6">
            {(['models', 'upload'] as TabOption[]).map((tab) => (
              <button
                key={tab}
                className={`py-3 px-4 font-medium ${
                  selectedTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab === 'models' ? 'Choose a Model' : 'Upload Your Photo'}
              </button>
            ))}
          </div>

          {/* Model Selector */}
          {selectedTab === 'models' && (
            <section>
              <h3 className="font-medium mb-4">Select a model with similar build</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {fitRoomModels.map((model) => (
                  <div
                    key={model.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedModel?.id === model.id
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-neutral-200 hover:border-primary'
                    }`}
                    onClick={() => {
                      setSelectedModel(model);
                      setUploadedImage('');
                    }}
                  >
                    <div className="aspect-[3/4] bg-neutral-100">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <p className="font-medium text-sm">{model.name}</p>
                      <p className="text-xs text-neutral-500">
                        {model.height}, {model.build}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upload Photo */}
          {selectedTab === 'upload' && (
            <section>
              <h3 className="font-medium mb-4">Upload your photo</h3>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-48 h-64 object-cover rounded-md mb-4"
                    />
                    <Button variant="outline" size="sm" onClick={() => setUploadedImage('')}>
                      Choose Different Photo
                    </Button>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={48} className="text-neutral-400 mb-3" />
                    <p className="text-neutral-600 mb-2">Drag and drop or browse files</p>
                    <label className="btn-primary cursor-pointer inline-block">
                      <span>Browse Files</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="mt-4 text-sm text-neutral-500">
                      Best results with a clear front-facing full-body photo
                    </p>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Product Selection */}
          <section className="mt-8">
            <h3 className="font-medium mb-4">Select a product to try on</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {clothingProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedProduct?.id === product.id
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-neutral-200 hover:border-primary'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square bg-neutral-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-xs text-neutral-500">
                      ₹{(product.price / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/shop" className="text-primary text-sm hover:underline">
                View all products
              </Link>
            </div>
          </section>

          {/* Try It On Button */}
          <div className="mt-8">
            <Button
              variant="primary"
              fullWidth
              disabled={!(selectedModel || uploadedImage) || !selectedProduct}
              onClick={handlePreview}
            >
              <TShirtIcon size={20} className="mr-2" />
              Try It On
            </Button>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-full">
          <h3 className="font-medium mb-4">Preview</h3>
          {showPreview && selectedProduct && (selectedModel || uploadedImage) ? (
            <div className="bg-neutral-100 h-[500px] flex items-center justify-center rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={selectedModel ? selectedModel.image : uploadedImage}
                  alt="Preview"
                  className="h-[450px] object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 p-4 rounded-lg backdrop-blur max-w-xs text-center">
                    <h4 className="font-bold">{selectedProduct.name}</h4>
                    <p className="text-neutral-600 text-sm my-2">
                      Perfect fit! This item complements your style.
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Link to={`/product/${selectedProduct.slug}`}>
                        <Button variant="primary" size="sm">View Product</Button>
                      </Link>
                      <Button variant="outline" size="sm">Try Different Size</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-100 h-[500px] flex items-center justify-center rounded-lg">
              <div className="text-center max-w-md p-6">
                <TShirtIcon size={64} className="text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Ready to try on!</h3>
                <p className="text-neutral-600 mb-4">
                  Select a model or upload a photo, then pick a product to preview.
                </p>
              </div>
            </div>
          )}

          {/* Product Details */}
          {showPreview && selectedProduct && (
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <h4 className="font-bold mb-2">{selectedProduct.name}</h4>
              <p className="text-sm text-neutral-600">{selectedProduct.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">
                  ₹{(selectedProduct.price / 100).toFixed(2)}
                </span>
                <Link to={`/product/${selectedProduct.slug}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitRoomPage;
