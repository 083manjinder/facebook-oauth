import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInsights } from "../redux/pageInsightsReducer";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { DateRangePicker } from "rsuite";
import { startOfDay, endOfDay, addDays, subDays } from "date-fns";

function PageInsights(props) {
  const { pageId, token } = props;
  let pageInsight = useSelector((state) => state.pageInsight.data);
  let loading = useSelector((state) => state.pageInsight.loading);
  const [dateRange, setDateRange] = useState([
    startOfDay(subDays(new Date(), 90)),
    endOfDay(new Date()),
  ]);
  const {
    allowedMaxDays,
    allowedDays,
    allowedRange,
    beforeToday,
    afterToday,
    combine,
  } = DateRangePicker;

  const dispatch = useDispatch();
  useEffect(() => {
    let fetchPageInsight = async () => {
      let sinceDate = formatDate(dateRange[0]);
      let untilDate = formatDate(dateRange[1]);
      dispatch(
        getInsights({
          pageId: pageId,
          pageToken: token,
          since: sinceDate,
          until: untilDate,
        })
      );
    };
    fetchPageInsight();
  }, [pageId, dateRange]);
  const handleDateRangeChange = (value) => {
    setDateRange(value);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const Ranges = [
    {
      label: "yesterday",
      value: [
        startOfDay(addDays(new Date(), -1)),
        endOfDay(addDays(new Date(), -1)),
      ],
    },
    {
      label: "last7Days",
      value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
    },

    {
      label: "Last 90 Days",
      value: [startOfDay(subDays(new Date(), 90)), endOfDay(new Date())],
    },
  ];
  return (
    <>
      <div className="d-flex flex-wrap align-content-centre ms-5 mt-5 w-100">
        {loading ? (
          <div className="text-center w-100 m-auto">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="date-container">
              <DateRangePicker
                placeholder="Select Date Range"
                onChange={handleDateRangeChange}
                format="yyyy-MM-dd"
                value={dateRange}
                ranges={Ranges}
                shouldDisableDate={combine(allowedMaxDays(90), afterToday())}
              />
            </div>
            {pageInsight.map((page) => (
              <Card
                style={{
                  width: "14rem",
                  height: "17rem",
                }}
                className="mx-3 my-3"
                key={page.id}
              >
                <CardBody>
                  <CardTitle tag="h5">{page.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {page.values[0].value}
                  </CardSubtitle>
                  <CardTitle tag="h5">Period</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {page.period == "total_over_range" && "Total Over Range"}
                  </CardSubtitle>
                  <CardTitle tag="h5">Since</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {formatDate(dateRange[0])}
                  </CardSubtitle>
                  <CardTitle tag="h5">Until</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {formatDate(dateRange[1])}
                  </CardSubtitle>
                </CardBody>
              </Card>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default PageInsights;
