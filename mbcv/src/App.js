import React from 'react';
import './App.css';

/** timeline */
const TimelineEntryKind = Object.freeze({
  APP: Symbol('app'),
  JOB: Symbol('job'),
  WRITING: Symbol('writing'),
  INTERNSHIP: Symbol('internship'),
  PROJECT: Symbol('project'),
  OTHER: Symbol('other'),
});

class TimelineEntry extends Object {
  title;
  description;
  kind;

  constructor(title, description, kind) {
    super();
    this.title = title;
    this.description = description;
    this.kind = kind;
  }
}

class TimelineEntryView extends React.Component {
  render() {
    return (
      <div className="App-timelineEntryView">
        <h3>{this.props.entry.title}</h3>
        <div className="App-timelineEntryDescription">
          {this.props.entry.description}
        </div>
      </div>
    );
  }
}

class TimelineView extends React.Component {
  entries;
  render() {
    const entryViews = this.props.entries.map((e) => (
      <TimelineEntryView entry={e} key={e} />
    ));
    return <div className="App-timeline">{entryViews}</div>;
  }
}
/** Circles */

class Circle extends React.Component {
  render() {
    return <div className="App-circle">{this.props.children}</div>;
  }
}

/** social icons */

class SocialIcon extends React.Component {
  render() {
    return (
      <Circle>
        <div className="App-socialIcon"></div>
      </Circle>
    );
  }
}

class SocialIconTray extends React.Component {
  render() {
    return <div className="App-socialIconTray">{this.props.children}</div>;
  }
}

/** app */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-circleFullWidth">
          <Circle>
            <img
              src="https://secure.gravatar.com/avatar/57f5ee2e1627b45e923de962ab0b0eab"
              className="App-photo"
              alt=""
            />
          </Circle>
        </div>
        <h3>Moshe Berman</h3>
        <h4>Software Engineer</h4>
        <SocialIconTray>
          <SocialIcon />
          <SocialIcon />
          <SocialIcon />
          <SocialIcon />
        </SocialIconTray>{' '}
      </header>
      <div className="App-body">
        <p>
          Hey, welcome to my website. If you're looking for the short version,
          this isn't it. Here you'll find all the things I've worked on over the
          years, including apps, projects, blogs, and more.
        </p>
        <TimelineView
          title="Apps"
          entries={[
            new TimelineEntry(
              'Meta/Facebook',
              'Project',
              TimelineEntryKind.JOB
            ),
          ]}
        />

        <h3>Jobs</h3>
        <ul></ul>
        <h3>Internships</h3>
        <h3>Projects</h3>
        <h3>Writing</h3>
      </div>
    </div>
  );
}

export default App;
