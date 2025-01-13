
const Statistics = () => {
    return (
        <div>
            <div>
                <div className="stats my-5 flex mx-10 shadow">
                    <div className="stat text-white bg-gradient-to-r from-indigo-500 to-pink-500">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div className="">Downloads</div>
                        <div className="">31K</div>
                        <div className="">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-white bg-gradient-to-r from-orange-500 to-red-500">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <div className="">New Users</div>
                        <div className="">4,200</div>
                        <div className="">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat text-white bg-gradient-to-r from-yellow-500 to-orange-500">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                        </div>
                        <div className="">New Registers</div>
                        <div className="">1,200</div>
                        <div className="">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;