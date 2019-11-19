const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const versions = require(`${CWD}/versions.json`);

function Versions(props) {
  const {config: siteConfig} = props;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <h3 id="latest">最新版本</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a
                    href="https://docs.kubeoperator.io">
                    文档
                  </a>
                </td>
              </tr>
            </tbody>

          <h3 id="archive">历史版本</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr>
                      <th>{version}</th>
                      <td>
                        <a
                          href={`https://docs.kubeoperator.io/${
                            props.language ? props.language + '/' : ''
                          }${version}/KubeOperator-v${version}/introduction`}>
                          文档
                        </a>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </table>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
