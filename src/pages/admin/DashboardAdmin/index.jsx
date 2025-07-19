import { FaUsers, FaDownload, FaMobile } from "react-icons/fa";
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import { getClubsCount, getMatchesCount, getUsersCount } from "../../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardAdmin() {
  const [matchesCount, setMatchesCount] = useState(0);
  const [clubsCount, setClubsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchMatchesCount = async () => {
      const response = await getMatchesCount();
      setMatchesCount(response.data.data.length);
    };
    fetchMatchesCount();

    const fetchClubsCount = async () => {
      const response = await getClubsCount();
      setClubsCount(response.data.data.length);
    };
    fetchClubsCount();

    const fetchUsersCount = async () => {
      const response = await getUsersCount();
      setUsersCount(response.data.length);
    };
    fetchUsersCount();
  }, []);

  return (
    <div className="p-6 bg-gray-50 h-full w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-6 mb-6 w-full">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500/20 rounded-full blur-lg"></div>

            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-300">Welcome back</span>
                  <span className="text-2xl">👋</span>
                </div>
                <h1 className="text-3xl font-bold mb-3">Admin</h1>
                <p className="text-gray-400 mb-6 max-w-lg">
                  If you want to search for a football match, please register as a user.
                </p>
              </div>

              {/* 3D Illustration */}
              <div className="hidden lg:block relative">
                <div className="relative">
                  {/* Paper airplane */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 transform rotate-45 rounded-sm"></div>

                  {/* White card */}
                  <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 bg-green-400 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  {/* Character */}
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Tổng số người dùng</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{usersCount}</p>
              </div>
              <div className="w-16 h-12 flex items-end gap-1">
                <div className="w-2 bg-green-400 rounded-t h-4"></div>
                <div className="w-2 bg-green-400 rounded-t h-6"></div>
                <div className="w-2 bg-green-400 rounded-t h-8"></div>
                <div className="w-2 bg-green-400 rounded-t h-5"></div>
                <div className="w-2 bg-green-400 rounded-t h-10"></div>
                <div className="w-2 bg-green-400 rounded-t h-7"></div>
                <div className="w-2 bg-green-400 rounded-t h-9"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Tổng số câu lạc bộ</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{clubsCount}</p>
              </div>
              <div className="w-16 h-12 flex items-end gap-1">
                <div className="w-2 bg-blue-400 rounded-t h-3"></div>
                <div className="w-2 bg-blue-400 rounded-t h-5"></div>
                <div className="w-2 bg-blue-400 rounded-t h-4"></div>
                <div className="w-2 bg-blue-400 rounded-t h-6"></div>
                <div className="w-2 bg-blue-400 rounded-t h-3"></div>
                <div className="w-2 bg-blue-400 rounded-t h-7"></div>
                <div className="w-2 bg-blue-400 rounded-t h-5"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Tổng số trận đấu</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{matchesCount}</p>
              </div>
              <div className="w-16 h-12 flex items-end gap-1">
                <div className="w-2 bg-red-400 rounded-t h-6"></div>
                <div className="w-2 bg-red-400 rounded-t h-4"></div>
                <div className="w-2 bg-red-400 rounded-t h-7"></div>
                <div className="w-2 bg-red-400 rounded-t h-3"></div>
                <div className="w-2 bg-red-400 rounded-t h-5"></div>
                <div className="w-2 bg-red-400 rounded-t h-4"></div>
                <div className="w-2 bg-red-400 rounded-t h-6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Line Chart - User Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tăng trưởng người dùng</h3>
              <FaUsers className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-64">
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Active Users',
                      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                      borderColor: 'rgb(59, 130, 246)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.4,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Bar Chart - Monthly Downloads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Số lượt tải hàng tháng</h3>
              <FaDownload className="w-5 h-5 text-green-500" />
            </div>
            <div className="h-64">
              <Bar
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      label: 'Downloads',
                      data: [65, 59, 80, 81, 56, 55, 40],
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                      ],
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Doughnut Chart - Device Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Phân bổ thiết bị</h3>
              <FaMobile className="w-5 h-5 text-purple-500" />
            </div>
            <div className="h-64 flex items-center justify-center">
              <Doughnut
                data={{
                  labels: ['Mobile', 'Desktop', 'Tablet'],
                  datasets: [
                    {
                      data: [65, 25, 10],
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FaUsers className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Người dùng mới hôm nay</span>
                </div>
                <span className="font-semibold text-blue-600">+245</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <FaDownload className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Số lượt tải hôm nay</span>
                </div>
                <span className="font-semibold text-green-600">+89</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <FaMobile className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Số lượt đăng nhập hôm nay</span>
                </div>
                <span className="font-semibold text-purple-600">1,234</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
