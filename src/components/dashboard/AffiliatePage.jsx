export default function AffiliatePage() {
    return (
      <div className="flex justify-start w-full bg-gray-100">
        <div className="w-full max-w-3xl p-6 ">
          <h1 className="text-xl font-bold">Become an affiliate and start earning!</h1>
          <p className="text-gray-600 mt-1">
            Build a multi-level network by inviting your friends who in turn will refer their friends
          </p>
          <div className="mt-4 p-4 border border-[#eee] rounded-[2px] bg-white ">
            <h2 className="text-lg font-semibold">How does it work?</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>You invite your friends.</li>
              <li>Your friends register, deposit funds, and place bets.</li>
              <li>You receive your reward!</li>
            </ul>
            <p className="text-gray-500 text-sm mt-2">
              As you refer friends, you build a multi-level network. At each level, you'll earn a percentage of the GGwiwinet profit:
            </p>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                I accept the <a href="#" className="text-sky-500 underline">Terms and Conditions</a>.
              </label>
            </div>
          </div>
          <button className="mt-4 w-full bg-sky-500 text-white py-2 rounded-[5px] font-semibold hover:bg-yellow-600">
            TAKE PART
          </button>
        </div>
      </div>
    );
  }
  