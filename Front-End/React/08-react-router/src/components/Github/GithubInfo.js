export const GithubInfoLoader = async () => {

  const res = await fetch('https://api.github.com/users/cwjihad')
  
  return res.json()
  
  
}