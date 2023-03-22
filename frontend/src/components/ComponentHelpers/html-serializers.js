import escapeHtml from 'escape-html'
import { jsx } from 'slate-hyperscript'
import { Text } from 'slate'

export const serialize = node => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        if (node.color) {
            string = `<span style="color:${node.color}">${string}</span>`
        }
        if (node.style) {
            string = `<span style="${node.style}">${string}</span>`
        }
        return string
    }

    const children = node.children.map(n => serialize(n)).join('')

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        default:
            return children
    }
}

export const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes = { ...markAttributes }

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'STRONG':
            nodeAttributes.bold = true
            break
        case 'SPAN':
            if (el.style.color) {
                nodeAttributes.color = el.style.color
            }
            if (el.style.fontStyle) {
                nodeAttributes.style = `font-style:${el.style.fontStyle}`
            }
            if (el.style.fontWeight) {
                nodeAttributes.style = `font-weight:${el.style.fontWeight}`
            }
            if (el.style.textDecoration) {
                nodeAttributes.style = `text-decoration:${el.style.textDecoration}`
            }
            break
        case 'EM':
            nodeAttributes.italic = true
            break
            //!@#$ added this recently
        default: break
    }

    // flatens each node into something that can be turned into a string.
    const children = Array.from(el.childNodes)
        .map(node => deserialize(node, nodeAttributes))
        .flat()

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''))
    }

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children)
        case 'P':
            return jsx('element', { type: 'paragraph' }, children)
        case 'A':
            return jsx(
                'element',
                { type: 'link', url: el.getAttribute('href') },
                children
            )
        default:
            return children
    }
}
