import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import checkMark from '../assets/check.svg';
import ContactInformation from '../types/contact-information.type';
import PersonalInformation from '../types/personal-information.type';

export default function ContactInformation() {
  const location = useLocation();
  const { personalInformation }: { personalInformation: PersonalInformation } = location.state;

  const [contactInformation, setContactInformation] = useState<ContactInformation>({
    email: "",
    mobileNumber: ""
  })

  // Routing
  const navigate = useNavigate()
  function nextPage() {
    if (isEmailValid && isMobileNumberValid) {
      navigate("/mailing-information", {
        state: {
          personalInformation,
          contactInformation
        }
      })
    }
  }

  // Validation
  const isEmailValid = useMemo(() => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
    return re.test(contactInformation.email);
  }, [contactInformation.email])
  const isMobileNumberValid = useMemo(() => {
    const re = /^09\d{9}$/;
    return re.test(contactInformation.mobileNumber);
  }, [contactInformation.mobileNumber])
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
              <div className="border-sky-500 relative w-20 h-20 bg-white border-4 rounded-full">
                <span className=" text-sky-500 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">
                  2
                </span>
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
              <div className="border-stone-300 relative w-20 h-20 bg-white border-4 rounded-full">
                <span className=" text-zinc-400 top-1/2 left-1/2 absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </div>
              <div className="flex flex-col justify-center ml-2">
                <span className=" text-2xl font-semibold">Third</span>
                <span className='text-zinc-600'>Mailing Information</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-[620px] h-full relative bg-white rounded-[5px] shadow flex items-center flex-col p-16 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="mobileNumber" className="text-zinc-600 text-sm">
                Mobile Number
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <input type="tel" id="mobileNumber" className="w-[500px] text-zinc-600 bg-zinc-100 rounded h-12 px-4 focus:border-none" placeholder="Please enter you phone number" typeof="number" value={contactInformation.mobileNumber}
                onChange={e => setContactInformation({
                  ...contactInformation, mobileNumber: e.target
                    .value
                })} pattern="09[0-9]{9}" />
              {
                contactInformation.mobileNumber && !isMobileNumberValid &&
                <span className="w-full font-bold text-red-500">Mobile Number is not valid</span>
              }
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobileNumber" className="text-zinc-600 text-sm">
                Email Address
                <span className="text-red-600 text-[15px] font-normal">*</span>
              </label>
              <input type="email" id="mobileNumber" className="w-[500px] bg-zinc-100 rounded text-zinc-600 h-12 px-4 focus:border-none" placeholder="Please enter you e-mail" typeof="email" value={contactInformation.email}
                onChange={e => setContactInformation({
                  ...contactInformation, email: e.target
                    .value
                })} />
              {
                contactInformation.email && !isEmailValid &&
                <span className="w-full font-bold text-red-500">Email is not valid</span>
              }
            </div>
            <div className="w-full">
              <button className="w-full bg-sky-500 rounded-[36px] h-12 text-white font-bold" onClick={nextPage}>Next Step</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}