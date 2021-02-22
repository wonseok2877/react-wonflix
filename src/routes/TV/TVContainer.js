import React from "react";
import { tvApi } from "../../api";
import TVPresenter from "./TVPresenter";

/* HomeContainer will be a full React component with state! */

class TVContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularResults: null,
      topRatedResults: null,
      airingTodayResults: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    try {
      const {
        data: { results: topRatedResults },
      } = await tvApi.topRated();
      const {
        data: { results: popularResults },
      } = await tvApi.popular();
      const {
        data: { results: airingTodayResults },
      } = await tvApi.airingToday();

      this.setState({
        topRatedResults,
        popularResults,
        airingTodayResults,
      });
    } catch (error) {
      this.setState({
        error: "Can't get tv info🤔",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    console.log("rendered");
    const {
      popularResults,
      topRatedResults,
      airingTodayResults,
      error,
      loading,
    } = this.state;
    return (
      <TVPresenter
        popular={popularResults}
        topRated={topRatedResults}
        airingToday={airingTodayResults}
        error={error}
        loading={loading}
      />
    );
  }
}

export default TVContainer;
