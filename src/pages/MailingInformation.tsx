import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import checkMark from "../assets/check.svg";
import { data as geoData } from "../assets/data/geodata.json" assert { type: "json" };
import ContactInformation from "../types/contact-information.type";
import { GeoData } from "../types/geo.type";
import MailingInformation from "../types/mailing-information.type";
import PersonalInformation from "../types/personal-information.type";
import User from "../types/user.type";
export default function MailingInformation() {
  const location = useLocation();
  const { personalInformation, contactInformation }: { personalInformation: PersonalInformation, contactInformation: ContactInformation } = location.state;

  const [mailingInfo, setMailingInfo] = useState<MailingInformation>({
    address: "",
    state: "",
    township: ""
  });

  const states = useMemo(() => {
    return geoData.map((item) => item.eng);
  }, [geoData]);

  const townships = useMemo(() => {
    // Search for the state
    const filteredGeoData: GeoData[] = geoData.filter((item) => {
      return item.eng === mailingInfo.state;
    });
    // Filter the state into districts and into townships
    // After those, flatten the array into single array
    const filteredTownships = filteredGeoData[0]?.districts.map(district => {
      return district.townships;
    }).flat();
    return filteredTownships;
  }, [mailingInfo.state])


  const navigate = useNavigate();
  function saveToLocalStorage() {
    const existingUsers = localStorage.getItem("users");

    let addingItems;
    if (existingUsers) {
      // Add existing Items into new items
      const parsedUsers: User[] = JSON.parse(existingUsers);
      addingItems = [...parsedUsers, { ...personalInformation, ...contactInformation, ...mailingInfo, id: parsedUsers.length }]
    } else {
      addingItems = [{ ...personalInformation, ...contactInformation, ...mailingInfo, id: 0 }]
    }

    localStorage.setItem("users", JSON.stringify(addingItems));
    // navigate("/");
  }
  return (
    <div>
      <div className="relative w-full h-full max-w-5xl pt-12 mx-auto bg-white">
        <div className="">
          <div className="relative flex">
            <div className="flex">
              <div className="bg-sky-500 border-sky-500 relative w-20 h-20 border-4 rounded-full">
                <img src={checkMark} alt="" className='fill-sky-50 top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2' />
              </div>
              <div className="flex flex-col justify-center ml-2">
                <span className="text-sky-500 text-2xl font-semibold">First</span>
                <span>Personal Information</span>
              </div>
              <div className="relative ml-2 w-[87px]">
                <div className="w-[87px] h-1 bg-zinc-300 left-0 top-1/2 -translate-y-1/2 absolute" />
              </div>
            </div>
            <div className="flex ml-3">
              <div className="border-sky-500 bg-sky-500 relative w-20 h-20 border-4 rounded-full">
                <img src={checkMark} alt="" className='fill-sky-50 top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2' />
              </div>
              <div className="flex flex-col justify-center ml-2">
                <span className=" text-2xl font-semibold">Second</span>
                <span>Contact Information</span>
              </div>
              <div className="relative ml-2 w-[87px]">
                <div className="w-[87px] h-1 bg-zinc-300 left-0 top-1/2 -translate-y-1/2 absolute" />
              </div>
            </div>
            <div className="flex flex-grow-0 ml-3">
              <div className="border-sky-500 relative w-20 h-20 bg-white border-4 rounded-full">
                <span className=" text-sky-500 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </div>
              <div className="flex flex-col justify-center ml-2">
                <span className=" text-2xl font-semibold">Third</span>
                <span>Mailing Information</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[620px] h-full relative bg-white rounded-[5px] shadow flex items-center flex-col p-16 gap-y-4">
            <div className="flex flex-col w-full">
              <label htmlFor="state" className="text-zinc-600 text-sm">
                State/District
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <select name="state" id="state" className="bg-zinc-100 w-full h-12 px-3 rounded" value={mailingInfo.state}
                onChange={(e) => setMailingInfo({ ...mailingInfo, state: e.target.value })
                }>
                {
                  states.map(item => (
                    <option value={item} key={item}>{item}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="township" className="text-zinc-600 text-sm">
                Township
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <select name="township" id="township" className="bg-zinc-100 w-full h-12 px-3 rounded" value={mailingInfo.township}
                onChange={(e) => setMailingInfo({ ...mailingInfo, township: e.target.value })
                }>
                {
                  townships?.map(item => (
                    <option value={item.eng} key={item.eng}>{item.eng}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="address" className="text-zinc-600 text-sm">
                Address
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <textarea className="bg-zinc-100 w-full p-3 rounded" rows={6} onChange={e => setMailingInfo({ ...mailingInfo, address: e.target.value })} value={mailingInfo.address} maxLength={350}>
              </textarea>
              <span className="text-neutral-400 text-xs font-normal">Your character limit is 350.</span>
            </div>
            <div className="w-full">
              <button className="w-full bg-sky-500 rounded-[36px] h-12 text-white font-bold" onClick={saveToLocalStorage}>Finished</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}