import bucketList from '../lib/bucketList';
import NavigationBar from '../components/NavigationBar';
import Head from 'next/head';

// Map goalType to a non-pink color
const tagColors = {
  'Professional': 'bg-blue-500/20 text-blue-400 border-blue-400',
  'Personal': 'bg-yellow-500/20 text-yellow-400 border-yellow-400',
  'Health': 'bg-green-500/20 text-green-400 border-green-400',
  'Experience': 'bg-orange-500/20 text-orange-400 border-orange-400',
  'Travel': 'bg-teal-500/20 text-teal-400 border-teal-400',
};

// Get unique goalTypes in the order they appear
const goalTypeOrder = Array.from(new Set(bucketList.map(item => item.goalType)));

export default function BucketListPage() {
  const total = bucketList.length;
  const inProgress = bucketList.filter(item => item.status === 'in-progress').length;

  // Group items by goalType
  const grouped = goalTypeOrder.map(type => ({
    type,
    items: bucketList.filter(item => item.goalType === type),
  }));

  return (
    <>
      <Head>
        <title>Muhsin Bin Irshad</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
        <NavigationBar />
      <main className="pt-40 pb-16 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">My Bucket List</h1>
            <p className="text-gray-300 text-lg">Dreams, goals, and adventures I want to achieve in my lifetime.</p>
          </div>
          <div className="flex gap-3 items-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-lg font-bold shadow">
              Total: <span className="ml-2 text-primary-400">{total}</span>
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-400/30 text-lg font-bold shadow">
              In Progress: <span className="ml-2 text-primary-400">{inProgress}</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          {grouped.map((group, idx) => (
            <div key={group.type} className={idx !== grouped.length - 1 ? 'mb-6' : ''}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl hover:shadow-primary-700/40 transition-all duration-300 flex flex-col h-[220px] overflow-hidden group"
                  >
                    {/* Blinking dot for in-progress */}
                    {item.status === 'in-progress' && (
                      <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-lg" />
                    )}
                    {/* Tick mark for completed */}
                    {item.status === 'completed' && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500/20 border border-green-400">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <polyline points="20 6 10 18 4 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    )}
                    <div className="flex-1 p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold shadow ${tagColors[item.goalType] || 'bg-gray-500/20 text-gray-300 border-gray-400'}`}>{item.goalType}</span>
                      </div>
                      <h2 className="text-lg font-extrabold text-white leading-tight line-clamp-2 group-hover:text-primary-400 transition-colors">{item.title}</h2>
                      <p className="text-base text-gray-200 leading-relaxed line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      </div>
    </>
  );
} 