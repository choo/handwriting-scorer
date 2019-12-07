build_frontend() {
    BASEDIR=$(cd $(dirname $0)/..; pwd)
    cd $BASEDIR/frontend
    npm install
    npm run build

    rm -rf $BASEDIR/backend/build || true # ignore dir not found error
    mv build $BASEDIR/backend
}
