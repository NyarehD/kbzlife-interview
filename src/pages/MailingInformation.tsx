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
  const [showRequired, setShowRequired] = useState(false)

  const [mailingInfo, setMailingInfo] = useState<MailingInformation>({
    mail_address: "",
    mail_state: "",
    mail_township: ""
  });

  const states = useMemo(() => {
    return geoData.map((item) => item.eng);
  }, [geoData]);

  const townships = useMemo(() => {
    // Search for the state
    const filteredGeoData: GeoData[] = geoData.filter((item) => {
      return item.eng === mailingInfo.mail_state;
    });
    // Filter the state into districts and into townships
    // After those, flatten the array into single array
    const filteredTownships = filteredGeoData[0]?.districts.map(district => {
      return district.townships;
    }).flat();
    return filteredTownships;
  }, [mailingInfo.mail_state])


  const navigate = useNavigate();
  function saveToLocalStorage() {
    if (mailingInfo.mail_address && mailingInfo.mail_state && mailingInfo.mail_township) {
      setShowRequired(false)
      const existingUsers = localStorage.getItem("users");

      let addingItems: User[];
      const { nrcNumber, nrcTypeNumber, ...otherPersonalInformation } = personalInformation;
      if (existingUsers) {
        // Add existing Items into new items
        const parsedUsers: User[] = JSON.parse(existingUsers);

        addingItems = [
          ...parsedUsers,
          {
            ...otherPersonalInformation, ...contactInformation, ...mailingInfo, id: parsedUsers.length, nrc: nrcTypeNumber + "(C)" + nrcNumber
          }]
      } else {
        addingItems = [{ ...personalInformation, ...contactInformation, ...mailingInfo, id: 0, nrc: nrcTypeNumber + "(C)" + nrcNumber }]
      }

      localStorage.setItem("users", JSON.stringify(addingItems));
      navigate("/");
    } else {
      setShowRequired(true)
    }
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
                <span className='text-zinc-600'>Personal Information</span>
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
                <span className='text-zinc-600'>Contact Information</span>
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
                <span className=" text-sky-500 text-2xl font-semibold">Third</span>
                <span className='text-zinc-600'>Mailing Information</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-[620px] border-slate-300/50 border rounded-md h-full relative bg-white shadow flex items-center flex-col p-16 gap-y-4">
            <div className="flex flex-col w-full">
              <label htmlFor="state" className="text-zinc-600 text-sm">
                State/District
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <select name="state" id="state" className="bg-zinc-100 w-full h-12 px-3 rounded" value={mailingInfo.mail_state}
                onChange={(e) => setMailingInfo({ ...mailingInfo, mail_state: e.target.value })
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
              <select name="township" id="township" className="bg-zinc-100 w-full h-12 px-3 rounded" value={mailingInfo.mail_township}
                onChange={(e) => setMailingInfo({ ...mailingInfo, mail_township: e.target.value })
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
              <textarea className="bg-zinc-100 w-full p-3 rounded resize-none" rows={6} onChange={e => setMailingInfo({ ...mailingInfo, mail_address: e.target.value })} value={mailingInfo.mail_address} maxLength={350}>
              </textarea>
              <span className="text-neutral-400 text-xs font-normal">Your character limit is 350.</span>
            </div>
            <div className="w-full">
              <button className="w-full bg-sky-500 rounded-[36px] h-12 text-white font-bold" onClick={saveToLocalStorage}>Finished</button>
              {showRequired && <span className="w-full font-bold text-red-500">Please fill required fields</span>}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}