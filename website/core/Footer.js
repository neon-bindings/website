const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const {baseUrl} = this.props.config;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const {baseUrl} = this.props.config;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('getting-started.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('word-counting-guide.html', this.props.language)}>
              Guides
            </a>
            <a href="https://api.neon-bindings.com/neon/index.html" target="_blank">
              API Reference
            </a>
          </div>
          <div>
            <h5>Community</h5>
            {this.props.config.users.length
              ? <a href={this.pageUrl('users.html', this.props.language)}>User Showcase</a>
              : null}
            <a href="https://rust-bindings-slackin.herokuapp.com/">Project Chat</a>
            <a
              href="https://twitter.com/rustneon"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href={this.props.config.repoUrl}>GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
