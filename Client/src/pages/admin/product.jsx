import React, { Fragment, useEffect } from 'react';
import Button from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CommonForm from '@/components/common/form';
import { shoeFormControl } from '@/config';
import ImageUpload from '@/components/admin/imageUpload';
import { addNewProduct, fetchAllProducts } from '@/store/admin/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, useToast } from '@/hooks/use-toast';
import AdminProduct from '@/components/admin/productShow';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  price: '',
  size: '',
  color: '',
  brand: '', 
};

const Product = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = React.useState(false);
  const [formData, setFormData] = React.useState(initialFormData);
  const [imageFile, setImageFile] = React.useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState('');
  const [imageLoading, setImageLoading] = React.useState(false);
  const { productList } = useSelector((state) => state.adminProducts);  // Corrected: use selector to get products
  const dispatch = useDispatch();
  const { toast } = useToast(); 

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      imageFile: uploadedImageUrl,
    })).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProductDialog(false);
        toast({
          title: 'Product Added Successfully',
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageUrl, "productList");

  return (
    <Fragment>
      {/* Add Product Button */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          className="border bg-blue-900 text-white"
          onClick={() => setOpenCreateProductDialog(true)}
        >
          Add Product
        </Button>
      </div>

      {/* Display Products */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ? 
          productList.map((product) => (
            <AdminProduct key={product._id} product={product} />  
          )) : null
        }
      </div>

      {/* Sheet for Adding Product */}
      <Sheet open={openCreateProductDialog} onOpenChange={setOpenCreateProductDialog}>
        <SheetContent
          side="right"
          className="overflow-auto fixed right-0 top-0 w-96 h-full bg-white p-6 shadow-lg z-50"
        >
          <SheetHeader>
            <SheetTitle>Add Product</SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formControls={shoeFormControl}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Product;
