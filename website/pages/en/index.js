const React = require('react');
const SyntaxHighlighter = require("react-syntax-highlighter/prism").default;
const { atomDark } = require('react-syntax-highlighter/styles/prism');
const CompLibrary = require('../../core/CompLibrary.js');
const {translate} = require("../../server/translate.js");

const {MarkdownBlock, Container, GridBlock} = CompLibrary;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer" style={{ background: props.background }}>
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="neonProjectLogo">
    <div class="neon-logo">
      <span class="open neon-heading neon-flicker-blink">Neon</span>
      <span class="hrs neon-subheading neon-flicker-buzz">{siteConfig.tagline}</span>
    </div>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const jsExample = `
function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result
}
`

const neonExample = `
fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let result = cx.number(fibonacci());
  println!("{}", result);
  Ok(result)
}`

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo />
        <div className="inner">
          <PromoSection>
            <SyntaxHighlighter customStyle={{ fontSize: '0.8em' }} language='javascript' style={atomDark}>{jsExample}</SyntaxHighlighter>
            <SyntaxHighlighter customStyle={{ fontSize: '0.8em' }} language='rust' style={atomDark}>{neonExample}</SyntaxHighlighter>

          </PromoSection>
          <PromoSection>
            <Button href={docUrl('getting-started', 'en')}>Try It Out</Button>
            <Button href={siteConfig.repoUrl} target="_blank">GitHub</Button>
            <Button href="https://api.neon-bindings.com/neon/index.html" target="_blank">API</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const FeatureCallout = () => (
  <React.Fragment>
    <div
      className="productShowcaseSection paddingBottom"
      style={{textAlign: 'center'}}>
      <h2 className="neon-heading">Don't Let Native Modules Scare You!</h2>
      <h3 className="neon-subheading">Neon makes writing native Node.js modules safe and fun, so you can **hack without fear**.</h3>
    </div>
    <div
      className="productShowcaseSection paddingBottom"
      style={{textAlign: 'center'}}>
      <h2 className="neon-heading">Crash-Free Memory Managment</h2>
      <h3 className="neon-subheading">Neon works together with the JS garbage collector so allocations are always properly managed.</h3>
    </div>
    <div
      className="productShowcaseSection paddingBottom"
      style={{textAlign: 'center'}}>
      <h2 className="neon-heading">Easy Parallelism</h2>
      <h3 className="neon-subheading">Safely run multiple threads, which is easy with convenient Rust APIs like Rayon.</h3>
    </div>
  </React.Fragment>
);

const LearnMore = () => (
  <Container
    padding={['bottom', 'top']}
    style={{textAlign: 'center'}}
    id="learn-more">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/jINMIAicaS0" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen />
  </Container>
);

const TryOut = () => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <a href={docUrl('getting-started', 'en')}><h2 className="neon-heading">Get Started!</h2></a>
  </div>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Who is Using This?</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="homeContainer">
          <FeatureCallout />
          <LearnMore />
          <TryOut />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
