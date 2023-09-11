import { useCallback, useMemo, useState } from 'react';
import './App.css';
import AddIcon from "./assets/add.svg";
import SortingIconTop from "./assets/column-sorting (1).svg";
import SortingIcon from "./assets/column-sorting.svg";
import LeftIcon from "./assets/left.svg";
import SearchIcon from "./assets/search.svg";
import User from './types/user.type';
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");

  // Get user data from localStorage
  const userData: User[] = useMemo(() => {
    const data = localStorage.getItem("users");
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData;
  }, [])

  // Search the local storage
  const searchedUserData: User[] = useMemo(() => {
    return userData.filter((item) => {
      return item.address.includes(searchKeyword) || item.fullName.includes(searchKeyword) || item.email.includes(searchKeyword) || item.mobileNumber.includes(searchKeyword) || item.nrc.includes(searchKeyword)
    })
  }, [searchKeyword])

  // Sorting Id indicator
  const [idSortStatus, setIdSortStatus] = useState<SortingStatus>(0);
  const toggleIdSortStatus = useCallback(() => {
    let setNumber: SortingStatus = idSortStatus === 0 ? 1 : idSortStatus === 1 ? 2 : 0;
    setIdSortStatus(setNumber);
  }, [idSortStatus])

  // Sorting name indicator
  const [nameSortStatus, setNameSortStatus] = useState<SortingStatus>(0);
  const toggleNameSortStatus = useCallback(() => {
    let setNumber: SortingStatus = nameSortStatus === 0 ? 1 : nameSortStatus === 1 ? 2 : 0;
    setNameSortStatus(setNumber);
  }, [nameSortStatus])

  // Sorted User Data
  const orderedUserData: User[] = useMemo(() => {
    let sortedData: User[] = searchedUserData;

    // Sorting Id
    if (idSortStatus === 1 || idSortStatus === 0) {
      // Ascending
      sortedData.sort((a: User, b: User) => {
        return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
      })
    } else {
      // Descending
      sortedData.sort((a: User, b: User) => {
        return (a.id < b.id) ? 1 : (a.id > b.id) ? -1 : 0;
      })
    }

    // Sorting Name
    if (nameSortStatus === 0) {
      // Without sorting
      sortedData = searchedUserData;
    } else if (nameSortStatus === 1) {
      // Ascending
      sortedData = searchedUserData.sort((a: User, b: User) => {
        return (a.fullName < b.fullName) ? -1 : (a.fullName > b.fullName) ? 1 : 0;
      })
    } else {
      // Descending
      sortedData = searchedUserData.sort((a: User, b: User) => {
        return (a.fullName < b.fullName) ? 1 : (a.fullName > b.fullName) ? -1 : 0;
      })
    }
    return sortedData;
  }, [searchedUserData, nameSortStatus, idSortStatus])

  // Pagination
  const [searchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page") || 1);


  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = useMemo(() => Math.floor(orderedUserData.length / rowsPerPage), [rowsPerPage, orderedUserData])

  const paginatedSortedUserData: User[] = useMemo(() => {
    const startId = currentPage !== 1 ? rowsPerPage * currentPage : 0;
    const endId = startId + rowsPerPage;
    return orderedUserData.slice(startId, endId);
  }, [orderedUserData, rowsPerPage, currentPage, nameSortStatus, idSortStatus])

  const nextPaginate = useCallback(() => {
    return navigate(`/?page=${currentPage !== totalPages ? currentPage + 1 : currentPage}`)
  }, [currentPage, totalPages])
  const prevPaginate = useCallback(() => {
    return navigate(`/?page=${currentPage > 1 ? currentPage - 1 : 1}`)
  }, [currentPage])

  const paginationStatus = useMemo(() => {
    const startId = currentPage !== 1 ? rowsPerPage * currentPage : 0;
    const endId = startId + rowsPerPage;
    return `${startId}-${endId} of ${orderedUserData.length}`
  }, [currentPage, rowsPerPage, orderedUserData])

  return (
    <div className="relative w-full h-full max-w-full py-12 mx-auto">
      <div className="bg-slate-100 border-slate-300/50 mx-24 border rounded">
        <div className="flex justify-between px-3 py-4">
          <div className="relative">
            <input type="text" className='w-80 h-8 px-3 py-1.5 bg-white border border-slate-300/50 rounded-md shadow justify-start items-center gap-2 inline-flex pl-10' placeholder='Search...' value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
            <img src={SearchIcon} alt="search icon" className='top-1/2 left-3 absolute -translate-y-1/2' />
          </div>
          <button className='w-[146px] mr-[70px] hover:bg-blue-800 duration-300 transition-colors h-8 px-3 py-1.5 bg-blue-600 rounded-md shadow justify-start items-center gap-2 inline-flex' onClick={() => navigate("/personal-information")}>
            <img src={AddIcon} alt="Add icons" />
            <span className='text-sm font-medium leading-tight tracking-tight text-white'> Add Customer</span>
          </button>
        </div>
        <div className="">
          <table className='table table-auto'>
            <thead className=''>
              <tr className='px-3 py-4'>
                <th className='text-start block w-6 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase'>
                  <input type="checkbox" name="" id="" className='relative w-4 h-4 bg-white rounded shadow' />
                </th>
                <th className='text-start hover:text-blue-500 w-1/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase cursor-pointer select-none' onClick={toggleIdSortStatus}>
                  <div className="flex">
                    <span className='mr-1 select-none'>#</span>
                    <SortingIndicator sorting={idSortStatus} />
                  </div>
                </th>
                <th className='text-start hover:text-blue-500 w-2/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase cursor-pointer select-none' onClick={toggleNameSortStatus}>
                  <div className="flex">
                    <span className="mr-1">Name</span>
                    <SortingIndicator sorting={nameSortStatus} />
                  </div>
                </th>
                <th className='text-start w-3/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase'>Address</th>
                <th className='text-start w-2/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase'>NRC</th>
                <th className='text-start w-2/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase'>EMAIL</th>
                <th className='text-start w-2/12 px-3 py-4 text-xs font-semibold leading-none tracking-wide text-gray-600 uppercase'>MOBILE NUMBER</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedSortedUserData.map((user, i) => (
                  <tr key={`id${user.id}index${i}`} className='hover:bg-slate-200 transition-colors duration-300'>
                    <td className='relative items-center px-3 mr-5 text-xs font-semibold leading-none tracking-wide text-center text-gray-600 uppercase align-middle'>
                      <input type="checkbox" name="" id="" className='top-1/2 absolute w-4 h-4 -translate-y-1/2 bg-white rounded shadow' />
                    </td>
                    <td className='px-3 py-4'>{user.id}</td>
                    <td className=' h-full px-3 py-4'>
                      <span className='block'>{user.fullName}</span>
                      <span className='block text-gray-500 text-sm font-normal leading-[18px] tracking-tight'>5684236532</span>
                    </td>
                    <td className='px-3 py-4 text-sm font-normal leading-tight text-gray-600'>{user.address}</td>
                    <td className='px-3 py-4 text-sm font-normal leading-tight text-black'>{user.nrc}</td>
                    <td className='px-3 py-4 text-sm font-normal leading-tight text-black'>{user.email}</td>
                    <td className='px-3 py-4'>{user.mobileNumber}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className=" flex flex-row justify-between px-5 py-3">
          <div>
            <span className=' text-base font-medium leading-5 tracking-tight text-gray-500'>{paginationStatus}</span>
          </div>
          <div className="flex">
            <div className="flex mr-5 text-right text-gray-500 text-base align-bottom font-medium leading-[18px] tracking-tight">
              <label htmlFor="Rows" className='align-bottom'>Rows per page:</label>
              <select name="Rows" id="Rows" className='ml-1' value={rowsPerPage} onChange={e => {
                setRowsPerPage(Number(e.target.value))
                navigate("/")
              }}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex">
              <button className='border-slate-300 border rounded' onClick={prevPaginate}>
                <img src={LeftIcon} alt="left icon" className='w-6 h-5' />
              </button>
              <span className='mx-1'>{currentPage}/{totalPages}</span>
              <button className='border-slate-300 border rounded' onClick={nextPaginate}>
                <img src={LeftIcon} alt="right icon" className='w-6 h-5 rotate-180' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

type SortingStatus = 0 | 1 | 2
function SortingIndicator({ sorting }: { sorting: SortingStatus }) {
  switch (sorting) {
    case 1:
      return (
        <img src={SortingIconTop} alt="sorting icon" className=' w-4 h-4 m-0' />
      )
    case 2:
      return (
        <img src={SortingIconTop} alt="sorting icon" className='w-4 h-4 m-0 rotate-180' />
      )
    default:
      return (
        <img src={SortingIcon} alt="sorting icon" className=' w-4 h-4 m-0' />
      )
  }
}