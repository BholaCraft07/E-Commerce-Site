
'use client'
import { useApi } from "@/context/Apidata";
import { useCart } from "@/context/CartContext";
import Portal from "@/Portal/Portal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaStar, FaStarHalf, FaCheck, FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineLocalShipping } from "react-icons/md";

const ProductOverview = () => {
  const { id } = useParams();
  const productId = Number(id);

  console.log(id)
  const [selectedImage, setSelectedImage] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { fetchData } = useApi();
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    const FetchProductDetails = async () => {
      try {
        const data = await fetchData(`/products/${productId}`);
        console.log(data)
        setProductDetails(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    FetchProductDetails();
  }, [fetchData, id])

  const product = {
    name: productDetails?.title || "Premium Comfort Athletic Shoes",
    description: productDetails?.description || "Experience ultimate comfort with our innovative athletic shoes. Featuring advanced cushioning technology, breathable mesh upper, and superior arch support for all-day comfort.",
    originalPrice: productDetails?.price || 199.99,
    discountedPrice: (
      (productDetails?.price || 0) -
      ((productDetails?.price || 0) * (productDetails?.discountPercentage || 0)) / 100
    ).toFixed(2),
    discount: productDetails?.discountPercentage || 20,
    rating: productDetails?.rating || 4.5,
    totalReviews: productDetails?.reviews?.length || 1250,
    sizes: productDetails?.sizes || ["S", "M", "L", "XL"],
    features: productDetails?.tags,
    images: productDetails?.images ?? [],
    ratingDistribution: productDetails?.reviews || {
      5: 750,
      4: 300,
      3: 125,
      2: 50,
      1: 25
    },
    reviews: productDetails?.reviews || [
      {
        name: "John Doe",
        rating: 5,
        date: "2024-01-15",
        verified: true,
        comment: "Excellent shoes! Very comfortable for long runs."
      },
      {
        name: "Jane Smith",
        rating: 4,
        date: "2024-01-10",
        verified: true,
        comment: "Good quality but sizing runs a bit large."
      }
    ],
    relatedProducts: productDetails?.relatedProducts || [
      {
        id: 1,
        name: "Sport Runner Pro",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
      },
      {
        id: 2,
        name: "Comfort Walker Elite",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42"
      },
      {
        id: 3,
        name: "Trail Blazer X",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
      }
    ]
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  //here we use context to add item in cart
  // const quantity = cartItem ? cartItem.quantity : 1;
  const { cartItems, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const quantity = cartItems.get(productId) ;


  //implement portal or pop up when we add item in cart
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId);
    setSuccessMessage('Item added to cart successfully!');
    setShowSuccessMessage(true);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessMessage]);


  useEffect(()=>{},[updateQuantity]);
  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 mt-4">
      <div className="shadow-md bg-gray-100 dark:bg-gray-800 p-6 rounded-lg gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-300 shadow-sm">
              <img
                src={product?.images[selectedImage] || "https://via.placeholder.com/300"}
                alt={product?.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 ">
              {product.images.length > 0 && product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer aspect-square rounded-md overflow-hidden ${selectedImage === index ? "ring-2 ring-gray-300 shadow-sm " : ""}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-primary">
                ${product.discountedPrice}
              </span>
              <span className="text-lg text-accent line-through text-gray-500 dark:text-gray-400">
                ${product.originalPrice}
              </span>
              <span className="bg-destructive text-white px-2 py-1 rounded-md">
                {product.discount}% OFF
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-accent text-gray-900 dark:text-gray-300">{product.totalReviews} reviews</span>
            </div>

            <p className="text-gray-900 dark:text-white">{product.description}</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-900 dark:text-white font-semibold">Size</label>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md ${selectedSize === size
                        ? "bg-primary text-white"
                        : "bg-secondary text-gray-900  dark:bg-secondary-dark  dark:text-gray-100"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 dark:text-white font-semibold">Quantity</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(productId, Math.max(1, quantity - 1))}
                    className="p-2 rounded-md bg-secondary text-gray-900 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    className="p-2 rounded-md bg-secondary text-gray-900 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-primary text-white py-3 rounded-md flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer" onClick={handleAddToCart}>
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-md ${isWishlisted ? "bg-destructive text-white" : "bg-secondary text-gray-900 dark:bg-gray-700 dark:text-white"}`}
              >
                <FaHeart className="text-xl" />
              </button>
            </div>
            {showSuccessMessage && (
              <Portal>
                <div className="fixed top-2 right-14 z-50">
                  <div className="bg-green-400 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-semibold">Item added to cart successfully!</p>
                  </div>
                </div>
              </Portal>
            )}

            {/* Features */}
            <div className="space-y-2">
              {/* Shipping Information */}
              <div className="py-2 shadow-md bg-gray-100 dark:bg-gray-700 p-6 rounded-lg gap-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <MdOutlineLocalShipping /> Shipping Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{`We offer fast and reliable shipping. Estimated delivery time is ${productDetails.shippingInformation}.`}</p>
              </div>

              {/* Return Policy */}
              <div className="py-2 shadow-md bg-gray-100 dark:bg-gray-700 p-6 rounded-lg gap-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Return Policy</h2>
                <p className="text-gray-600 dark:text-gray-300">{`You can return items within ${productDetails.returnPolicy} of purchase. Please ensure the product is in its original condition.`}</p>
              </div>

              {/* Warranty */}
              <div className="py-2 shadow-md bg-gray-100 dark:bg-gray-700 p-6 rounded-lg gap-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Warranty</h2>

                <p className="text-gray-600 dark:text-gray-300">
                  {`All our products come with a ${productDetails.warrantyInformation} covering defects and malfunctions`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading mb-6 text-gray-900 dark:text-white">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="max-w-[100%]">
              {Object.entries(product.ratingDistribution)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center space-x-4 mb-2">
                    <span className="w-12 text-gray-900 dark:text-white">{rating} stars</span>
                    <div className="flex-1 bg-secondary dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-primary dark:bg-primary rounded-full h-4 max-w-[100%]"
                        style={{
                          width: `${product.totalReviews ? (count / product.totalReviews) * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="space-y-0">
              {product.reviews.map((review, index) => (
                <div key={index} className="shadow-md bg-gray-100 dark:bg-gray-700 p-2 my-1 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{review.reviewerName ? review.reviewerName : 'Bhola Kumar'}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{new Date(review.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex mb-2">{renderStars(review.rating)}</div>
                  <p className="text-gray-900 dark:text-white">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading mb-6 text-gray-900 dark:text-white">Related Products</h2>
          <div className="relative">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {product.relatedProducts.map((item) => (
                <div key={item.id} className="flex-none w-64 bg-card dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-primary font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductOverview;
