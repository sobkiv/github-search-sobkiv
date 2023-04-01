import axios from 'axios';

async function fetchGitHubData(request) {
  const URL = `https://api.github.com/search/repositories?q=${request}`;
  return await axios.get(URL);
}

export default fetchGitHubData;
