const config = {
    branches: [
        'production',
        {
            name:'staging',
            prerelease: true
        }
    ],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'conventionalcommits',
            parserOpts: {
                noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'], 
            },
            releaseRules: [
                { type: 'breaking_change', release: 'major'}
            ],  
        }],
        '@semantic-release/release-notes-generator',
        ["@semantic-release/changelog", {
            "changelogFile": "./CHANGELOG.md" 
        }],
        ["@semantic-release/git", {
            "assets": ["dist/*.js", "dist/*.js.map", "CHANGELOG.md"],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }],
        '@semantic-release/github'
    ],
};

export default config;


