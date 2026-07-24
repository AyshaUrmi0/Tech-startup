import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { FaChevronLeft, FaChevronRight, FaSortAmountDown } from "react-icons/fa";

const AllCampaigns = () => {
  const [allCampaignsRaw, setAllCampaignsRaw] = useState([]);
  const [displayedCampaigns, setDisplayedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [sortByDesc, setSortByDesc] = useState(false);
  const [isServerPaginated, setIsServerPaginated] = useState(false);
  const navigate = useNavigate();

  // Fetch campaigns from backend
  const fetchCampaigns = async (currentPage, isDesc) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://tech-spring-server.vercel.app/addCampaigns?page=${currentPage}&limit=${limit}&sortByDesc=${isDesc}`
      );
      const data = await response.json();
      
      if (data && !Array.isArray(data) && data.campaigns) {
        // Backend Server-Side Paginated Payload
        setIsServerPaginated(true);
        setDisplayedCampaigns(data.campaigns);
        setTotalPages(data.totalPages || 1);
        setTotalCampaigns(data.totalCampaigns || 0);
      } else if (Array.isArray(data)) {
        // Backend Array Payload (Client-Side Pagination fallback)
        setIsServerPaginated(false);
        setAllCampaignsRaw(data);
        setTotalCampaigns(data.length);
        const pages = Math.ceil(data.length / limit) || 1;
        setTotalPages(pages);

        // Slice exact 10 items for the current page
        const startIndex = (currentPage - 1) * limit;
        setDisplayedCampaigns(data.slice(startIndex, startIndex + limit));
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(page, sortByDesc);
  }, [page, sortByDesc]);

  // When changing page on client-side array mode
  useEffect(() => {
    if (!isServerPaginated && allCampaignsRaw.length > 0) {
      const startIndex = (page - 1) * limit;
      setDisplayedCampaigns(allCampaignsRaw.slice(startIndex, startIndex + limit));
    }
  }, [page, isServerPaginated, allCampaignsRaw, limit]);

  // Handle descending sort toggle
  const handleSort = () => {
    const nextSort = !sortByDesc;
    setSortByDesc(nextSort);
    setPage(1);
  };

  // Pagination navigation
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <Typewriter
            words={["All Campaigns", "Explore Tech & Innovation Projects"]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </h1>
        
        {/* Sort Toggle Button */}
        <button
          onClick={handleSort}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl shadow-md transition-colors w-fit"
        >
          <FaSortAmountDown />
          <span>{sortByDesc ? "Sorted: High → Low" : "Sort by Min Donation"}</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-900">
        {loading ? (
          <Loading />
        ) : (
          <>
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-teal-600 dark:bg-teal-900 text-white">
                  <th className="px-6 py-4 font-semibold text-sm">Campaign Title</th>
                  <th className="px-6 py-4 font-semibold text-sm">Minimum Donation</th>
                  <th className="px-6 py-4 font-semibold text-sm">Deadline</th>
                  <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-900 dark:text-gray-100">
                {displayedCampaigns.map((campaign) => (
                  <tr key={campaign._id} className="hover:bg-teal-50/50 dark:hover:bg-gray-800/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm">{campaign.title}</td>
                    <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-bold text-sm">
                      ${campaign.minimumDonation}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">
                      {new Date(campaign.deadline).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/campaign/${campaign._id}`)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg transition-colors shadow-sm"
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Showing Page <span className="font-bold text-gray-900 dark:text-white">{page}</span> of{" "}
                <span className="font-bold text-gray-900 dark:text-white">{totalPages}</span> ({totalCampaigns} Total Campaigns)
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="p-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft />
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                        page === pageNum
                          ? "bg-teal-600 text-white border-teal-600 dark:bg-teal-500 dark:border-teal-500"
                          : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="p-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;
