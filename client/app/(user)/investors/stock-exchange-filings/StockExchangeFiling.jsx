import { axiosInstance } from "@/app/utils/axiosInstance";
import { buildUploadedAssetUrl } from "@/app/utils/cmsAssetPath";
import { Square } from "lucide-react";

export default async function StockExchangeFiling({ session }) {
  const { data } = await axiosInstance(
    "public/stock-exchange-filing/getBySession",
    {
      params: {
        session: session ?? "",
      },
    }
  );
  if (!data || data.length === 0) {
    return <p className="mt-3">No Records to Display</p>;
  }
  return (
    <>
      {data ? (
        data?.map((el) => (
          <div className="mt-7" key={el._id}>
            <p className="text-2xl font-bold mb-3">FY {el.financialYear}</p>
            {el?.stockExchangeFilings?.map((item) => (
              <p
                className="text-xl border-b border-gray-500  flex items-center gap-4 py-1.5"
                key={item.title}
              >
                <Square className="fill-[black] rounded-none" size={10} />
                <a
                  href={buildUploadedAssetUrl(item?.file?.filePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </p>
            ))}
          </div>
        ))
      ) : (
        <p className="mt-3">No Records to Display</p>
      )}
    </>
  );
}
