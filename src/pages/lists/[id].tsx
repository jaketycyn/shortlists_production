import { useState, useCallback } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";

import {
  HiOutlineChevronLeft,
  HiX,
  HiOutlineCheck,
  HiPlus,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";

import { trpc } from "../../utils/trpc";
import { type AddItemSchema } from "../../server/schema/itemSchema";

const resolver: Resolver<AddItemSchema> = async (values) => {
  return {
    values: !values.itemTitle ? {} : values,
    errors: !values.itemTitle
      ? {
          itemTitle: {
            type: "required",
            message: "A title is required",
          },
        }
      : {},
  };
};

const ListPage: NextPage = () => {
  const router = useRouter();

  const [showTextInput, setShowTextInput] = useState(false);
  const [showItemOptions, setShowItemOptions] = useState(false);
  const [hasFocus, setFocus] = useState(false);

  const listId = router.query.id;

  const listItems = [
    { id: 123, title: "item1" },
    { id: 456, title: "item2" },
  ];

  const clearItemInput = () => {
    setShowTextInput(!showTextInput);

    //clearItemValue();
    // ^ context that cleared the input value of the form previously
  };

  //TODO: Add items through trpc
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddItemSchema>({
    resolver,
  });

  const onSubmit = useCallback(
    async (data: AddItemSchema) => {
      try {
        const result = data;
        console.log("data found with value: ", data);
        // const result = await mutateAsync(data)
        if (result) {
          //showToast Agent
          console.log("result found with value: ", result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [router]
    //might need to add something for test firing
  );

  //TODO: Add items through redux

  //TODO: Retrieve items through redux
  //TODO: Utilize items from redux for local rendering purposes

  //TODO: DELETE items through trpc
  //TODO: DELETE items through redux

  //TODO: Share Items

  const dispatch = useAppDispatch();

  const { lists, loading } = useAppSelector((state) => state.list);
  //console.log("lists inside [id]: ", lists);

  const Listindex = lists?.findIndex((item) => item.id === listId);
  //console.log("ListIndex is: ", Listindex);

  const currentTitle = lists?.[Listindex!]?.title;
  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        {/* Header Nav: Start */}
        <header className="border-grey z-80 sticky top-0 grid h-14 w-full grid-rows-1 border-b p-4 text-center">
          <Link href="/" className="row-start-1">
            <HiOutlineChevronLeft className="mt-1 h-4 w-4" />
          </Link>
          <div className="row-start-1 w-full items-center justify-between text-center">
            {lists ? <h1> {currentTitle}</h1> : null}
          </div>
          <div className="row-start-1">
            {/* some sort of share interface or module pop up or navigation to a share form page for inputs */}
            <div className="share">Share Icon</div>
          </div>
          <div className="row-start-1">...</div>
        </header>
        {/* Header Nav: End */}
        <div className="z-0 m-6 grid h-full grid-flow-row auto-rows-max items-center overflow-scroll p-2">
          <div className="relative grid">
            <div className="items-center py-1 text-center">
              <h3 className="bg-primary text-lg">{currentTitle}</h3>

              {/* https://stackoverflow.com/questions/62382324/react-typescript-this-jsx-tags-children-prop-expects-a-single-child-of-type */}
              {/* react fragments solve error  */}
              {/*   Display Items Module: Start */}
              <>
                {listItems.length >= 1 ? (
                  listItems.map((item, index) => (
                    <div
                      className="relative z-0 mt-1 grid cursor-pointer grid-cols-4 gap-2 rounded-lg border-2 border-solid border-black bg-white p-2 font-semibold text-black hover:bg-gray-200"
                      key={index}
                    >
                      <div className="col-span-3 col-start-1">{item.title}</div>
                    </div>
                  ))
                ) : (
                  <div>No items in this list. Please add some below</div>
                )}
              </>
              {/*   Display Items Module: End */}
              {/*   Add Item Module: Start */}

              <div className="text-gray-dark my-8 items-center rounded">
                <span
                  className={`cursor pointer mt-8 flex items-center justify-center rounded-lg border-2 border-solid border-black bg-primary p-2 hover:bg-gray-400 ${
                    showTextInput && "hidden"
                  }`}
                  onClick={() => {
                    setShowTextInput(!showTextInput);
                    setShowItemOptions(false);
                  }}
                >
                  Add an item...
                </span>
                <span className={`${!showTextInput && "hidden"}`}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Error Toast/Message: Start */}
                    {/* //TODO: Change to Toast pop up and use useState to clear it on cancel so a new submit must be fired for error toast to appear */}
                    <div className="mb-4">
                      {errors?.itemTitle && (
                        <p className="inline  p-2 font-bold text-red-800">
                          ⚠{errors.itemTitle.message}
                        </p>
                      )}
                    </div>
                    {/* Error Toast/Message: End */}
                    <input
                      type="text"
                      id="itemTitle"
                      className="block h-20 w-full rounded-lg border border-gray-300 bg-primary  p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter a title for this card..."
                      onFocus={() => setFocus(true)}
                      onTouchCancel={() => setFocus(false)}
                      onTouchEnd={() => setFocus(false)}
                      {...register("itemTitle")}
                    />
                    <span className="relative mt-6 flex items-center justify-center ">
                      <button
                        className="hover:bg-green-800focus:ring-4 absolute left-0    rounded-lg bg-green-500 px-4 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-blue-300 "
                        type="submit"
                        //onClick={handleSubmit}
                      >
                        Add Item
                      </button>
                      <button
                        className="absolute right-0 rounded-lg bg-red-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  "
                        onClick={() => clearItemInput()}
                        type="reset"
                      >
                        Cancel
                      </button>
                    </span>
                  </form>
                </span>
              </div>
              {/*   Add Item Module: End */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
