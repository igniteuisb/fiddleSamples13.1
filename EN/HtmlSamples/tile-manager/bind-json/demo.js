$(function () {
            $('#dashboard').igTileManager({
                layoutConfiguration: {
                    gridLayout: {
                        columnWidth: '25%',
                        columnHeight: '50%',
                        marginLeft: 10,
                        marginTop: 10
                    }
                },
                wrap: true,
                rightPanelTilesWidth: 200,
                rightPanelWidth: 420,
                dataSource: dataSource,
                maximizedState: '<h3>${name}</h3><img src="${picture}" title="${name}" alt="error" /><p>${text}</p>' +
                '<div style="clear: both"><span class="color">Skills:</span></div>' +
                '<ul>{{each ${skills} }}<li>${skills.description}</li>{{/each}}</ul>' +
                '<div><span class="color">LinkedIn:</span> <a href="${linkedin}" target="_blank">http://www.linkedin.com/profile</a></div>',
                minimizedState: '<h4>${name}</h4><img src="${picture}" class="minimized" title="${name}" alt="error" />',
                rendered: function (event, ui) {
                    $('#dashboard').find('ul').igTree();
                }
            });
        });