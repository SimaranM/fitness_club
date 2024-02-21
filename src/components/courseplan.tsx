import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import "../styles/courseplan.scss";

const ClassTimeTable: React.FC = () => {
    const [filter, setFilter] = useState<string>("all");

    const handleFilterChange = (tsfilter: string) => {
        setFilter(tsfilter);
    };

    interface ScheduleItem {
        day: string;
        timeRange: string;
        className: string;
        tsmeta: string;
    }

    interface ClassDataItem {
        time: string;
        schedule: ScheduleItem[];
    }

    const data = useStaticQuery(graphql`
        query {
            allCourseplanJson {
                nodes {
                    tableData {
                        time
                        schedule {
                            day
                            timeRange
                            className
                            tsmeta
                        }
                    }
                    filters {
                        name
                        value
                    }
                    tableHeaders
                    pageTitle
                }
            }
        }
    `);

    const classData: ClassDataItem[] =
        data.allCourseplanJson.nodes[0].tableData;
    const filters = data.allCourseplanJson.nodes[0].filters;
    const tableHeaders = data.allCourseplanJson.nodes[0].tableHeaders;
    const mainHeader = data.allCourseplanJson.nodes[0].pageTitle;

    return (
        <section className="classtime-section" id="kursplan">
            <div className="container pb-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="section-title">
                            <h2>{mainHeader}</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="timetable-controls">
                            <ul>
                                {filters.map(
                                    (
                                        filterItem: {
                                            name: string;
                                            value: string;
                                        },
                                        index: number,
                                    ) => (
                                        <li
                                            key={index}
                                            className={
                                                filter === filterItem.value
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleFilterChange(
                                                    filterItem.value,
                                                )
                                            }>
                                            {filterItem.name}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="classtime-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {tableHeaders.map(
                                    (header: string, index: number) => (
                                        <th key={index}>{header}</th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {classData.map((item, index) => (
                                <tr key={index}>
                                    <td className="workout-time">
                                        {item.time}
                                    </td>
                                    {tableHeaders.map(
                                        (day: string, dayIndex: number) => (
                                            <td key={dayIndex}>
                                                {item.schedule
                                                    .filter(
                                                        (scheduleItem) =>
                                                            (scheduleItem.tsmeta ===
                                                                filter ||
                                                                filter ===
                                                                    "all") &&
                                                            scheduleItem.day ===
                                                                day,
                                                    )
                                                    .map(
                                                        (
                                                            scheduleItem,
                                                            scheduleIndex,
                                                        ) => (
                                                            <div
                                                                key={
                                                                    scheduleIndex
                                                                }
                                                                className={`hover-bg ts-item ${scheduleItem.tsmeta}`}>
                                                                <span>
                                                                    {
                                                                        scheduleItem.timeRange
                                                                    }
                                                                </span>
                                                                <h6>
                                                                    {
                                                                        scheduleItem.className
                                                                    }
                                                                </h6>
                                                            </div>
                                                        ),
                                                    )}
                                            </td>
                                        ),
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ClassTimeTable;
