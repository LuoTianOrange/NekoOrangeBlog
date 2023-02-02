let defaultMotion = ''
let touchHead = ''
let touchSpecial = ''
let touchBody = ['', '', '']

class Viewer {
    /**
     * 创建模型canvas
     * @param {{
     *          rootPath: string,
     *          modelName: string,
     *          zoom: number,
     *          defaultMotion: string,
     *          width: int,
     *          height: int,
     *          loadSizeLimit: [int, int],
     *          clickActions: [[string, string]]
     *          }} setting
     */
    constructor(setting) {
        // 根路径
        this.rootPath = setting.rootPath;
        // 根路径里的模型文件夹名
        this.modelName = setting.modelName
        // 缩放倍数
        this.zoom = setting.zoom
        // 默认动作(待机)
        defaultMotion = setting.defaultMotion
        // 最小加载尺寸(小于不加载)
        this.loadSizeLimit = setting.loadSizeLimit // [width, height]
        // 点击网格模型的动作
        this.clickActions = setting.clickActions  // [ [网格名1, 动作名1], ...]

        this.l2d = new L2D(this.rootPath);

        this.canvas = $(".Canvas");

        // this.selectCharacter = $(".selectCharacter");
        this.selectAnimation = $(".selectAnimation");
        if (window.innerWidth <= this.loadSizeLimit[0] || window.innerHeight <= this.loadSizeLimit[1]) {
            this.canvas.css('display', 'none')
        } else {
            this.canvas.css('display', 'block')
        }
        window.addEventListener('resize', data => {
            if (data.currentTarget.innerWidth <= this.loadSizeLimit[0] || data.currentTarget.innerHeight <= this.loadSizeLimit[1]) {
                this.canvas.css('display', 'none')
            } else {
                this.canvas.css('display', 'block')
            }
        })

        this.l2d.load(this.modelName, this);
        // var wt = window.innerWidth * 0.9;
        // var ht = (wt / 16.0) * 9.0;

        let width = setting.width
        let height = setting.height
        this.app = new PIXI.Application(width, height, {transparent: true});
        this.canvas.html(this.app.view);

        this.app.ticker.add((deltaTime) => {
            if (!this.model) {
                return;
            }

            this.model.update(deltaTime);
            this.model.masks.update(this.app.renderer);
        });
        window.onresize = (event) => {
            if (event === void 0) {
                event = null;
            }
            // let width = window.innerWidth * 0.9;
            // let height = (width / 16.0) * 9.0;
            let width = setting.width
            let height = setting.height
            this.app.view.style.width = width + "px";
            this.app.view.style.height = height + "px";
            this.app.renderer.resize(width, height);

            if (document.getElementById("darken") != null) {
                document.getElementById("darken").top = window.pageYOffset + "px";
                document.getElementById("selector").top = (window.pageYOffset + (window.innerHeight * 0.05)) + "px";
            }

            if (this.model) {
                this.model.position = new PIXI.Point((width * 0.5), (height * 0.5));
                this.model.scale = new PIXI.Point((this.model.position.x * this.zoom), (this.model.position.x * this.zoom));
                this.model.masks.resize(this.app.view.width, this.app.view.height);
            }
        };
        this.isClick = false;
        this.app.view.addEventListener('mousedown', (event) => {
            this.isClick = true;
        });
        window.addEventListener('mousemove', (event) => {
            if (this.model) {
                this.model.inDrag = true;
            }
            if (this.model) {
                let mouse_x = this.model.position.x - event.offsetX;
                let mouse_y = this.model.position.y - event.offsetY;
                this.model.pointerX = -mouse_x / this.app.view.height;
                this.model.pointerY = -mouse_y / this.app.view.width;
            }
        });
        this.app.view.addEventListener('mouseup', (event) => {
            if (!this.model) {
                return;
            }
            if (this.isClick) {
                this.clickActions.forEach(element => {
                    console.log(element)
                    if (this.isHit(element[0], event.offsetX, event.offsetY)) {
                        this.startAnimation(element[1], 'base')
                    }
                })
                if (this.isHit('TouchHead', event.offsetX, event.offsetY)) {
                    this.startAnimation(touchHead, "base");
                } else if (this.isHit('TouchSpecial', event.offsetX, event.offsetY)) {
                    this.startAnimation(touchSpecial, "base");
                } else {
                    const bodyMotions = ["touch_body", ...touchBody];
                    let currentMotion = bodyMotions[Math.floor(Math.random() * bodyMotions.length)];
                    this.startAnimation(currentMotion, "base");
                }
            }

            this.isClick = false;
            this.model.inDrag = false;
        });
    }

    changeCanvas(model) {
        this.app.stage.removeChildren();

        this.selectAnimation.empty();
        model.motions.forEach((value, key) => {
            if (key != "effect") {
                let btn = document.createElement("button");
                let label = document.createTextNode(key);
                btn.appendChild(label);
                btn.className = "btnGenericText";
                btn.addEventListener("click", () => {
                    this.startAnimation(key, "base");
                });
                this.selectAnimation.append(btn);
            }
        });

        this.model = model;
        this.model.update = this.onUpdate; // HACK: use hacked update fn for drag support
        // console.log(this.model);
        this.model.animator.addLayer("base", LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1);

        this.app.stage.addChild(this.model);
        this.app.stage.addChild(this.model.masks);

        window.onresize();
    }

    onUpdate(delta) {
        let deltaTime = 0.016 * delta;

        if (!this.animator.isPlaying) {
            let m = this.motions.get(defaultMotion);
            this.animator.getLayer("base").play(m);
        }
        this._animator.updateAndEvaluate(deltaTime);

        if (this.inDrag) {
            this.addParameterValueById("ParamAngleX", this.pointerX * 30);
            this.addParameterValueById("ParamAngleY", -this.pointerY * 30);
            this.addParameterValueById("ParamBodyAngleX", this.pointerX * 10);
            this.addParameterValueById("ParamBodyAngleY", -this.pointerY * 10);
            this.addParameterValueById("ParamEyeBallX", this.pointerX);
            this.addParameterValueById("ParamEyeBallY", -this.pointerY);
        }

        if (this._physicsRig) {
            this._physicsRig.updateAndEvaluate(deltaTime);
        }

        this._coreModel.update();

        let sort = false;
        for (let m = 0; m < this._meshes.length; ++m) {
            this._meshes[m].alpha = this._coreModel.drawables.opacities[m];
            this._meshes[m].visible = Live2DCubismCore.Utils.hasIsVisibleBit(this._coreModel.drawables.dynamicFlags[m]);
            if (Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(this._coreModel.drawables.dynamicFlags[m])) {
                this._meshes[m].vertices = this._coreModel.drawables.vertexPositions[m];
                this._meshes[m].dirtyVertex = true;
            }
            if (Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(this._coreModel.drawables.dynamicFlags[m])) {
                sort = true;
            }
        }

        if (sort) {
            this.children.sort((a, b) => {
                let aIndex = this._meshes.indexOf(a);
                let bIndex = this._meshes.indexOf(b);
                let aRenderOrder = this._coreModel.drawables.renderOrders[aIndex];
                let bRenderOrder = this._coreModel.drawables.renderOrders[bIndex];

                return aRenderOrder - bRenderOrder;
            });
        }

        this._coreModel.drawables.resetDynamicFlags();
    }

    startAnimation(motionId, layerId) {
        if (!this.model) {
            return;
        }

        let m = this.model.motions.get(motionId);
        if (!m) {
            return;
        }

        let l = this.model.animator.getLayer(layerId);
        if (!l) {
            return;
        }

        l.play(m);
    }

    isHit(id, posX, posY) {
        if (!this.model) {
            return false;
        }

        let m = this.model.getModelMeshById(id);
        if (!m) {
            return false;
        }

        const vertexOffset = 0;
        const vertexStep = 2;
        const vertices = m.vertices;

        let left = vertices[0];
        let right = vertices[0];
        let top = vertices[1];
        let bottom = vertices[1];

        for (let i = 1; i < 4; ++i) {
            let x = vertices[vertexOffset + i * vertexStep];
            let y = vertices[vertexOffset + i * vertexStep + 1];

            if (x < left) {
                left = x;
            }
            if (x > right) {
                right = x;
            }
            if (y < top) {
                top = y;
            }
            if (y > bottom) {
                bottom = y;
            }
        }

        let mouse_x = m.worldTransform.tx - posX;
        let mouse_y = m.worldTransform.ty - posY;
        let tx = -mouse_x / m.worldTransform.a;
        let ty = -mouse_y / m.worldTransform.d;

        return ((left <= tx) && (tx <= right) && (top <= ty) && (ty <= bottom));
    }
}

function onChangeLog() {
    $(document.body).append($("<div></div>")
        .attr("id", "darken")
        .addClass("darken")
        .css("top", window.pageYOffset + "px")
        .click(function () {
            $('#selector').remove();
            $('#darken').remove();
            $(document.body).css("overflow", "auto");
        }))
        .append($("<div></div>")
            .attr("id", "selector")
            .addClass("selector")
            .css("top", (window.pageYOffset + (window.innerHeight * 0.05)) + "px")
            .css("padding", "2%"))
        .css("overflow", "hidden");
    $("#selector").append($("<table></table>")
        .addClass("wikitable")
        .append($("<tr></tr>")
            .append($("<td></td>")
                .css("background-color", "#24252D")
                .css("height", "30px")
                .css("padding-left", "8px")
                .html("<b>Changelog</b>")
            )
        )
        .append($("<tr></tr>")
            .append($("<td></td>")
                .attr("id", "chglog")
                .css("padding", "15px")
                .css("vertical-align", "text-top")
            )
        )
    )

    var cb = function (response) {
        for (i in response) {
            var message = response[i].commit.message;
            var date = response[i].commit.committer.date;
            date = date.replace("T", " ");
            date = date.replace("Z", " UTC");

            $("#chglog").append($("<p></p>")
                .css("line-height", "0.8")
                .html(message + "<br>")
                .append($("<font></font>")
                    .css("font-size", "10px")
                    .css("color", "gray")
                    .html(date)
                )
            );
        }
    }

    var xobj = new XMLHttpRequest();
    xobj.open("GET", "https://api.github.com/repos/alg-wiki/AzurLaneL2DViewer/commits?sha=gh-pages", true);
    xobj.setRequestHeader("Authorization", "token c44bb04d2275b3c1849b49f02d8c1b473c5b6864");
    //access token scope: <<no scope>>
    //Grants read-only access to public information (includes public user profile info, public repository info, and gists)
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            cb(JSON.parse(xobj.response));
        }
    };
    xobj.send(null);
}

function onSelectBG() {
    console.log(window.pageXOffset + " : " + window.pageYOffset);
    var div = document.createElement('div');
    div.className = "darken";
    div.id = "darken";
    div.style.top = window.pageYOffset + "px";
    div.addEventListener("click", function (e) {
        document.body.removeChild(document.getElementById("selector"));
        document.body.removeChild(document.getElementById("darken"));
        document.body.style.overflow = "auto";
    }, false);
    document.body.appendChild(div);
    document.body.style.overflow = "hidden";
    var selector = document.createElement('div');
    selector.id = "selector";
    selector.className = "selector";
    selector.style.top = (window.pageYOffset + (window.innerHeight * 0.05)) + "px";
    document.body.appendChild(selector);
    for (var i = 0; i < backgroundData.length; i++) {
        var img = document.createElement('div');
        img.className = "thumbbutton";
        img.style.backgroundImage = "url(../assets/bg/" + backgroundData[i] + ")";
        img.style.backgroundSize = "100%";
        img.id = backgroundData[i];
        img.addEventListener("click", function (e) {
            document.getElementById("L2dCanvas").style.backgroundImage = "url(../assets/bg/" + this.id + ")";
            document.body.removeChild(document.getElementById("selector"));
            document.body.removeChild(document.getElementById("darken"));
            document.body.style.overflow = "auto";
        }, false);
        document.getElementById("selector").appendChild(img);
    }
}

