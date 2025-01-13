import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const Statistics = () => {
    const data = [10,44,875,454,]
    const { user } = useContext(AuthContext)
    return (
        <div>
            <div>
                <div>
                    <div className="lg:flex lg:stats gap-5 shadow">

                        <div className="stat  bg-green-400">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div className="stat-title font-bold">Todo</div>
                            <div className="stat-value text-primary">0 Task</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat mt-2 lg:m-0 bg-purple-300">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title font-bold">Ongoing</div>
                            <div className="stat-value text-secondary">0 Task</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat mt-2 lg:m-0 bg-yellow-400">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">{0}%</div>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-desc text-secondary">31 tasks remaining</div>
                        </div>

                    </div>
                    <div className="my-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold border-l-2 pl-3 border-red-600">Recent Task</h1>
                            <Link to='/dashboard/add-task' className="bg-green-500 px-6 py-2 rounded text-white font-bold">Create</Link>
                        </div>
                        <div className="divider"></div>
                        <div>
                            {/* Recents */}
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="bg-gray-300">
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Deadline</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            Array.isArray(data) &&
                                            data?.map((stat) => (
                                                <tr key={stat?._id}>
                                                    <td className="font-bold">{stat?.title}</td>
                                                    <td>{stat?.status}</td>
                                                    <td>{stat?.deadline}</td>
                                                    <td> {/* Place the div here, within a td element */}
                                                        <div className='flex mt-1 items-center'>
                                                            <Link to={`/dashboard/updatetask/${stat?._id}`}>
                                                                <button className='lg:col-span-2 md:col-span-2 col-span-3 py-2 bg-gray-300 px-3 lg:px-6'>
                                                                    <FaPen className='text-center mx-auto'></FaPen>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;