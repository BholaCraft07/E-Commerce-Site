import Carousal from "@/component/Carousal";
import CategoryShow from "@/component/CategoryShow";

export default function Home() {
 

  return (
    <div className="bg-white dark:bg-gray-900 mt-4">
      <Carousal />
     <CategoryShow/>
    </div>
  );
}
