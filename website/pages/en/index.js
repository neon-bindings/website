/* eslint max-classes-per-file: off */
const React = require('react');
const SyntaxHighlighter = require('react-syntax-highlighter/dist/cjs/index.js')
  .default;
const { atomDark } = require('react-syntax-highlighter/dist/cjs/styles/prism');
const CompLibrary = require('../../core/CompLibrary.js');
const { translate } = require('../../server/translate.js');

const { MarkdownBlock, Container, GridBlock } = CompLibrary;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const { baseUrl } = siteConfig;

function imgUrl(img) {
  return `${baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
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
  target: '_self'
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
    <div className="neon-logo">
      <span className="open neon-heading neon-flicker-blink">Neon</span>
      <span className="hrs neon-subheading">{siteConfig.tagline}</span>
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
// JS
function hello() {
  let result = fibonacci(10000);
  console.log(result);
  return result;
}
`;

const neonExample = `
// Neon
fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
  let result = cx.number(fibonacci(10000));
  println!("{}", result);
  Ok(result)
}`;

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo />
        <div className="inner">
          <PromoSection>
            <SyntaxHighlighter
              customStyle={{ fontSize: '0.8em' }}
              language="javascript"
              style={atomDark}
            >
              {jsExample}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              customStyle={{ fontSize: '0.8em' }}
              language="rust"
              style={atomDark}
            >
              {neonExample}
            </SyntaxHighlighter>
          </PromoSection>
          <PromoSection>
            <Button href={docUrl('getting-started')}>Try It Out</Button>
            <Button href={siteConfig.repoUrl} target="_blank">
              GitHub
            </Button>
            <Button
              href="https://neon-bindings.com/api/neon/index.html"
              target="_blank"
            >
              API
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container padding={['bottom', 'top']} id={props.id}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = () => (
  <Block layout="fourColumn" className="features">
    {[
      {
        title: 'Simple Tooling',
        content:
          'No makefiles. No fancy global build requirements. Just Node and Rust',
        image: `${baseUrl}img/hammer.svg`,
        imageAlign: 'top'
      },
      {
        title: 'Guaranteed Safety',
        content:
          'If a neon module compiles, it is guaranteed to be memory safe by the rust compiler',
        image: `${baseUrl}img/checkmark.svg`,
        imageAlign: 'top'
      },
      {
        title: 'Easy Parallelism',
        content: 'Safely run multiple threads without data races',
        image: `${baseUrl}img/fork.svg`,
        imageAlign: 'top'
      }
    ]}
  </Block>
);

const exampleCode = `
fn make_an_array(mut cx: FunctionContext) -> JsResult<JsArray> {
  // Create some values:
  let n = cx.number(9000);
  let s = cx.string("hello");
  let b = cx.boolean(true);

  // Create a new array:
  let array: Handle<JsArray> = cx.empty_array();

  // Push the values into the array:
  array.set(&mut cx, 0, n)?;
  array.set(&mut cx, 1, s)?;
  array.set(&mut cx, 2, b)?;

  // Return the array:
  Ok(array)
}

register_module!(mut cx, {
  // Export the Rust function as a JS function
  cx.export_function("makeAnArray", make_an_array)
})
`;
const Examples = () => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{ textAlign: 'center' }}
  >
    <h2>A Taste</h2>
    <SyntaxHighlighter language="rust" style={atomDark}>
      {exampleCode}
    </SyntaxHighlighter>
  </div>
);

const Demo = () => (
  <Container
    padding={['bottom', 'top']}
    style={{ textAlign: 'center' }}
    id="learn-more"
  >
    <h2>A Demo</h2>
    <a href="https://asciinema.org/a/SkInoIU6BrKz7g10HSWppDATM" target="_blank">
      <img
        alt="demo"
        src="https://asciinema.org/a/SkInoIU6BrKz7g10HSWppDATM.svg"
      />
    </a>
  </Container>
);

const TryOut = () => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{ textAlign: 'center' }}
  >
    <a href={docUrl('getting-started')}>
      <h2 className="neon-heading">Get Started!</h2>
    </a>
  </div>
);

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="homeContainer">
          <Features />
          <Examples />
          <Demo />
          <TryOut />
        </div>
      </div>
    );
  }
}

module.exports = Index;
