class Fetch{
    constructor(){
        this.clientId = 'b5b0538ab1fa09de9582',
        this.secretKey = '940b7d951c2894a43e269d54435d69ac1bb652a4',
        this.repoPerPage = 10,
        this.repoSorting = 'created: asc'
    }

    async getData(input){
        const profileResponse = await fetch(`https://api.github.com/users/${input}?client_id=${this.cliendId}&client_secret=${this.secretKey}`);
        const repoResponse = await fetch(`https://api.github.com/users/${input}/repos?per_page=${this.repoPerPage}&sort=${this.repoSorting}&client_id=${this.cliendId}&client_secret=${this.secretKey}`);

        const profileData = await profileResponse.json();
        const repoData = await repoResponse.json();

        return {
            profile: profileData,
            repo: repoData
        }
    }
}

export default Fetch;