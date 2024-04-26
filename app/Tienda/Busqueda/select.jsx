export default function Select() {
    return (
<div className="relative mt-3">
              <div className="absolute inset-y-10 left-20 flex items-center">
                <label htmlFor="country" className="sr-only">
                    Precios
                </label>
                <select id="country" name="country" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                  <option value={""}>Todo</option>
                  <option value={50}>50</option>
                  <option value={100} >100</option>
                  <option value={150}>150</option>
                </select>

              </div>
            </div>
    )
  }