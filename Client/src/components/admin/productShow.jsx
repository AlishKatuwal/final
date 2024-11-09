import Button from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProduct({ product }) {
  console.log(product); // Debugging: Check the contents of the product object

  // If the product object is not available, return a fallback message
  if (!product) {
    return <p>No product available</p>;
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img 
            src={product?.image || 'default_image_url'} // Fallback if no image
            alt={product?.title || 'No title available'}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-primary text-lg">
              ${product?.price || 'N/A'}
            </span>
            <span>{product?.size || 'N/A'}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProduct;
Remove-Item -Recurse -Force .git
