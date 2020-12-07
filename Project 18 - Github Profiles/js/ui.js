class UI{
    constructor(){
        this.app_div = document.querySelector('.app-content');
    }

    buildUI(data){
        const reposHTML = data.repo.map(repo => `
        <div class="app-repositories-repo">
            <span class="repo-label">${repo.name}</span>
            <ul class="repo-info">
                <li class="list-item">
                    <span class="stars-label">Stars: ${repo.stargazers_count}</span>
                </li>
                <li class="list-item">
                    <span class="watchers-label">Watchers: ${repo.watchers}</span>
                </li>
                <li class="list-item">
                    <span class="forks-label">Forks: ${repo.forks}</span>
                </li>
            </ul>
        </div>
        `).join('');

        this.app_div.innerHTML = `
            <div class="app-profile mb-xlarge">
                <div class="app-profile__image">
                    <img src="${data.profile.avatar_url}" alt="${data.profile.name}">
                </div>
                <div class="app-profile__user-info">
                    <ul class="user-info mb-medium">
                        <li class="list-item">
                            <span class="repos-label">Public Repos: ${data.profile.public_repos}</span>
                        </li>
                        <li class="list-item">
                            <span class="gists-label">Public Gists: ${data.profile.public_gists}</span>
                        </li>
                        <li class="list-item">
                            <span class="followers-label">Followers: ${data.profile.followers}</span>
                        </li>
                        <li class="list-item">
                            <span class="following-label">Following: ${data.profile.following}</span>
                        </li>
                    </ul>
                    <ul class="user-details mb-medium">
                        <li class="list-item">
                            <span class="label mb-small">Username</span>
                            <p class="paragraph">${data.profile.name}</p>
                        </li>
                        <li class="list-item">
                            <span class="label mb-small">Company</span>
                            <p class="paragraph">${data.profile.company}</p>
                        </li>
                        <li class="list-item">
                            <span class="label mb-small">Location</span>
                            <p class="paragraph">${data.profile.location}</p>
                        </li>
                        <li class="list-item"> 
                            <span class="label mb-small">Member Since</span>
                            <p class="paragraph">${data.profile.created_at}</p>
                        </li>
                    </ul>
                    <a href="${data.profile.html_url}" class="view-profile" target="blank">View Profile</a>
                </div>
            </div>
            <div class="app-repositories">
                ${data.repo.length === 0 ? `
                    <h1 class="heading-one mb-large">Latest Repositories</h1>
                    <div class="app-repositories-repo">
                        <span class="repo-label error">There is nothing here.</span>
                    </div>
                ` : `
                    <h1 class="heading-one mb-large">Latest Repositories</h1>
                    ${reposHTML}
                `}
            </div>
        `
    }

    errorUI(message){
        this.app_div.innerHTML = `
            <div class="app-error">
                <h2 class="heading-two error">${message}</h2>
            </div>
        `
    }
}

export default UI;