module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    // "next/babel"
  ],
  plugins: [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "index.css"
      }
    ]
  ]
}