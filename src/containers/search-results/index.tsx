import React from "react";
import AgentDashboardLeft from "../../newcomponents/agent-dashboard-left";
import SearchResultsMain from "../../newcomponents/search-results-main";

const SearchResults: React.FC = () => {
  return (
    <div className="main">
      <AgentDashboardLeft />
      <SearchResultsMain />
    </div>
  );
};

export default SearchResults;
