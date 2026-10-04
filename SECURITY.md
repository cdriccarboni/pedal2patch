# Security

## Secrets
Never commit:
- Android keystores
- Google Play service-account JSON
- API keys
- signing passwords
- private certificates

Use GitHub Actions Secrets for release credentials.

## Network safety
UDP/OSC console control is not considered enabled until a real implementation is tested against supported hardware. The UI must not imply a successful hardware write when the transport is unavailable.

## Reporting
For a release-blocking security issue, open a private GitHub security report when repository security reporting is available, or contact the project owner through the repository account.
