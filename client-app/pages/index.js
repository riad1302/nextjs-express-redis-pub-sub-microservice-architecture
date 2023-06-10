import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [value, updateValue] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const baseUrl = "http://localhost:5003";
  const getDataUrl = `${baseUrl}/api/post`;
  const createDataUrl = `${baseUrl}/api/post`;

  const getData = async () => {
    try {
      const { data } = await axios.get(getDataUrl);
      updateValue(data.data);
      console.log({ message: "got data", data });
      return data;
    } catch (error) {
      console.error({ message: "failed fetching data.", error });
    }
  };

  const createData = async (titleText, descriptionText, dateText) => {
    try {
      const { data } = await axios.post(createDataUrl, { title: titleText, description: descriptionText, created_at: dateText });
      console.log({ message: "posted data", data });
      return data;
    } catch (error) {
      console.error({ message: "failed creating data.", error });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await createData(title, description, date);
    setDescription("");
    setTitle("");
    setDate("");
  };
  useEffect(() => {
    getData();
  }, []);

  return (
      <div className='w-full'>
        <div className='p-8 justify-center flex'>
          <form className='w-2/4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
            <h4 class="mb-6 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Post Created
            </h4>
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title</label>
              <input type="text"
                     id="title"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={title}
                     onChange={(evt) => setTitle(evt.target.value)}
                     required/>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description</label>
              <input type="text"
                     id="description"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={description}
                     onChange={(evt) => setDescription(evt.target.value)}
                     required/>
            </div>
            <div className="mb-6">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date</label>
                <input type="date"
                       id="date"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       value={date}
                       onChange={(evt) => setDate(evt.target.value)}
                       required/>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>

        <div className='mt-8 p-8 justify-center flex'>
          <table className="w-full border-collapse border border-slate-400 ...">
            <caption className="mb-6 caption-top">
              Posts List
              <button class="rounded-full ..." onClick={getData} >
              get data
            </button>
            </caption>
            <thead>
            <tr>
              <th className="border border-slate-300 ...">#</th>
              <th className="border border-slate-300 ...">Title</th>
              <th className="border border-slate-300 ...">Description</th>
              <th className="border border-slate-300 ...">Date</th>
            </tr>
            </thead>
            <tbody>
            {value && value.map((data) => {
              return (
              <tr>
                <td className="border border-slate-300 ...">Indiana</td>
                <td className="border border-slate-300 ...">{data.title}</td>
                <td className="border border-slate-300 ...">{data.description}</td>
                <td className="border border-slate-300 ...">{data.created_at}</td>
              </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
  );
}
