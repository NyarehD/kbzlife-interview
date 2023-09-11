import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data as geoData } from "../assets/data/geodata.json" assert { type: "json" };
import { data as nrcData } from "../assets/data/nrc.json" assert { type: "json" };
import { GeoData } from "../types/geo.type";
import PersonalInformation from "../types/personal-information.type";
export default function PersonalInformation1() {
  const [personalInformation, setPersonalInformation] = useState<PersonalInformation>({
    type: "NRC",
    fullName: "",
    state: "",
    township: "",
    nrcTypeNumber: "",
    dateOfBirth: "",
    nrcNumber: "",
    title: "Mr"
  });

  const states = useMemo(() => {
    return geoData.map((item) => item.eng);
  }, [geoData]);

  const townships = useMemo(() => {
    // Search for the state
    const filteredGeoData: GeoData[] = geoData.filter((item) => {
      return item.eng === personalInformation.state;
    });
    // Filter the state into districts and into townships
    // After those, flatten the array into single array
    const filteredTownships = filteredGeoData[0]?.districts.map(district => {
      return district.townships;
    }).flat();
    return filteredTownships;
  }, [personalInformation.state])
  // Get NRC number and shorthand after selecting township
  const nrcTypeNumber: string | undefined = useMemo(() => {
    const filteredNrcData = nrcData.filter(item => {
      const splittedTownship = item.name_mm.split(" ");
      return splittedTownship[1] === personalInformation.township;
    });
    return filteredNrcData[0] && `${filteredNrcData[0]?.nrc_code}/${filteredNrcData[0]?.name_en}`;
  }, [personalInformation.township]);

  useEffect(() => {
    setPersonalInformation({ ...personalInformation, nrcTypeNumber })
  }, [nrcTypeNumber]);

  // Check date of birth whether 18 years or older
  const isMature = useMemo(() => {
    let today = new Date();
    let birthDate = new Date(personalInformation.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, [personalInformation.dateOfBirth]);

  // Routing
  const navigate = useNavigate()
  function nextPage() {
    if (isMature) {
      navigate("/contact-information", {
        state: {
          personalInformation
        }
      })
    }
  }
  return (
    <div className="relative w-full h-full max-w-5xl pt-12 mx-auto bg-white">
      <div className="">
        <div className="relative flex">
          <div className="flex">
            <div className="border-sky-500 relative w-20 h-20 bg-white border-4 rounded-full">
              <span className="text-sky-500 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">1</span>
            </div>
            <div className="flex flex-col justify-center ml-2">
              <span className="text-sky-500 text-2xl font-semibold">First</span>
              <span className="text-zinc-600">Personal Information</span>
            </div>
            <div className="relative ml-2 w-[87px]">
              <div className="w-[87px] h-1 bg-zinc-300 left-0 top-1/2 -translate-y-1/2 absolute" />
            </div>
          </div>
          <div className="flex ml-3">
            <div className="border-stone-300 relative w-20 h-20 bg-white border-4 rounded-full">
              <span className=" text-zinc-400 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">
                2
              </span>
            </div>
            <div className="flex flex-col justify-center ml-2">
              <span className=" text-2xl font-semibold">Second</span>
              <span className="text-zinc-600">Contact Information</span>
            </div>
            <div className="relative ml-2 w-[87px]">
              <div className="w-[87px] h-1 bg-zinc-300 left-0 top-1/2 -translate-y-1/2 absolute" />
            </div>
          </div>
          <div className="flex flex-grow-0 ml-3">
            <div className="border-stone-300 relative w-20 h-20 bg-white border-4 rounded-full">
              <span className=" text-zinc-400 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">
                3
              </span>
            </div>
            <div className="flex flex-col justify-center ml-2">
              <span className=" text-2xl font-semibold">Third</span>
              <span className="text-zinc-600">Mailing Information</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-[620px] h-full relative bg-white border-slate-300/50 shadow border rounded-md flex items-center flex-col p-16 gap-y-4">
          <div className="gap-x-4 flex flex-row justify-start w-full">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-zinc-600 text-sm">
                Type
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <select name="title" id="title" className="w-[113px] h-12 bg-zinc-100 text-zinc-600 rounded px-3" defaultValue={personalInformation.title} onChange={e => setPersonalInformation({ ...personalInformation, title: e.target.value })}>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="fullName" className="text-zinc-600 text-sm">
                Full Name
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <input type="text" id="fullName" className="bg-zinc-100 focus:border-none w-full h-12 px-4 rounded" placeholder="Please enter you name" typeof="text" value={personalInformation.fullName} onChange={e => setPersonalInformation({ ...personalInformation, fullName: e.target.value })} />
            </div>
          </div>
          <div className="gap-x-4 flex flex-row w-full">
            <div className="">
              <input type="radio" name="nrcType" id="NRC" className="mr-1" value="NRC" onChange={e => setPersonalInformation({ ...personalInformation, type: e.currentTarget.value })} checked={personalInformation.type === "NRC"} />
              <label htmlFor="NRC" className="text-zinc-600 text-base font-normal">NRC</label>
            </div>
            <div className="">
              <input type="radio" name="nrcType" id="oldNRC" className="mr-1" value="Old NRC" onChange={e => setPersonalInformation({ ...personalInformation, type: e.currentTarget.value })} checked={personalInformation.type === "Old NRC"} />
              <label htmlFor="oldNRC" className="text-zinc-600 text-base font-normal">Old NRC</label>
            </div>
            <div className="">
              <input type="radio" name="nrcType" id="passport" className="mr-1" value="Passport" onChange={e => setPersonalInformation({ ...personalInformation, type: e.currentTarget.value })} checked={personalInformation.type === "Passport"} />
              <label htmlFor="passport" className="text-zinc-600 text-base font-normal">Passport</label>
            </div>
          </div>
          <div className="gap-x-3 flex flex-row w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="state" className="text-zinc-600 text-sm">
                State
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <select name="state" id="state" className="bg-zinc-100 text-zinc-600 w-full h-12 px-3 rounded" value={personalInformation?.state}
                onChange={(e) => setPersonalInformation({ ...personalInformation, state: e.target.value })
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
              <select name="township" id="township" className="bg-zinc-100 text-zinc-600 w-full h-12 px-3 rounded" value={personalInformation?.township}
                onChange={(e) => setPersonalInformation({ ...personalInformation, township: e.target.value })
                }>
                {
                  townships?.map((item, i) => (
                    <option value={item.mm} key={item.eng}>{item.eng}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col w-full self-end h-[48px] bg-zinc-100 text-zinc-600 rounded px-3 py-3">
              <span className="">{nrcTypeNumber}</span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="nrcNumber" className="text-zinc-600 text-sm">
              Number
              <span className="text-red-600 text-[15px] font-normal">*</span>
            </label>
            <input type="text" id="nrcNumber" className="bg-zinc-100 text-zinc-600 focus:border-none w-full h-12 px-4 rounded" value={personalInformation.nrcNumber} onChange={e => setPersonalInformation({ ...personalInformation, nrcNumber: e.target.value })} />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="nrcNumber" className="text-zinc-600 text-sm">
              Date of Birth
              <span className="text-red-600 text-[15px] font-normal">*</span>
            </label>
            <input type="text" id="nrcNumber" className="bg-zinc-100 text-zinc-600 focus:border-none w-full h-12 px-4 rounded" value={personalInformation.dateOfBirth} onChange={e => setPersonalInformation({ ...personalInformation, dateOfBirth: e.target.value })} placeholder="MM/DD/YYYY" />
            {
              personalInformation.dateOfBirth && !isMature &&
              <span className="w-full font-bold text-red-500">Must be 18 years or older</span>
            }
          </div>
          <div className="w-full">
            <button className="w-full bg-sky-500 rounded-[36px] h-12 text-white font-bold"
              onClick={nextPage}>Next Step</button>
          </div>
        </div>
      </div>
    </div>
  )
}