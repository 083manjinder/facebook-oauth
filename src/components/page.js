import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "../redux/pageReducer";
import {NavbarText} from 'reactstrap'
import Dashboard from "./dashboard";
import PageInsights from "./pageInsights";

function Page() {
  const [pageActive, setPageActive] = useState({ id: "", pageToken: "" });
  const pageList = useSelector((state) => state.page.data);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (user?.id) {

      dispatch(getPages({ userId: user?.id, accessToken:user.accessToken }));
    }
  }, [user]);
  return (
    <>
      <div className="d-flex ">
        <div
          className="d-flex flex-column p-3 text-white bg-light border  min-vh-100"
          style={{ width: "280px" }}
        >
          <ul className="nav nav-pills  flex-column mb-auto">
            {pageList.length > 0 &&
              pageList.map((page) => (
                <li
                  className={`nav-item d-flex align-items-center mt-3 page p-1 ${
                    pageActive.id == page.id ? "page-active" : ""
                  }`}
                  key={page.id}
                  onClick={() =>
                    setPageActive((prevState) => ({
                      ...prevState,
                      id: page.id,
                      pageToken: page.access_token,
                    }))
                  }
                >
                  <img className="rounded-circle" src={page.picture.data.url} />
                  <NavbarText  className="nav-link noHover text-secondary fw-bold">
                    {page.name}
                  </NavbarText>
                </li>
              ))}
          </ul>
        </div>
        {pageActive.id && pageActive.pageToken ? (
          <PageInsights pageId={pageActive.id} token={pageActive.pageToken} />
        ) : (
          <Dashboard />
        )}
      </div>
    </>
  );
}

export default Page;
